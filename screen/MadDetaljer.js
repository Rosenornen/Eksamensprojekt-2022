import * as React from 'react';
import { View, Text, StyleSheet, Image, Button} from 'react-native';
import { auth, db, firebase } from "../firebase"
import {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

const MadDetaljer = ({route,navigation}) => {
  const [food,setFood] = useState({});
  const [reserved, setReserved] = useState(false);

  useEffect(() => {
      /*Henter food values og sætter dem*/
      setFood(route.params.food[1]);

      /*Når vi forlader screen, tøm object*/
      return () => {
          setFood({})
      }
  });
///SKAL TILFØJES SÅ MAN KAN VÆLGE DET FOOD ID MAN ER INDE
  const toggleReserved = () => {
      firebase.database().ref(`MadTilAfhentning/`).update({
          reserved: !reserved,
          userwhoreserved: auth.currentUser?.uid
      });
      setReserved(!reserved);
  }

  if (!food) {
      return <Text>No data</Text>;
  }

    //all content
    return (
        <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
       <View style={styles.container}>
            <Text style = {styles.textDisplay}>Hvem: {food.hvem}</Text> 
            <Text style = {styles.textDisplay}>Hvor: {food.hvor}</Text>
            <Text style = {styles.textDisplay}>Hvad: {food.hvad}</Text>
            <Text style = {styles.textDisplay}>Afhentningstidspunkt: {food.afhentningstidspunkt}</Text>
            <Text style = {styles.textDisplay}>Madtype: {food.madtype?.label}</Text>
            {food.image && (
        <Image source={{ uri: food.image }} style={styles.image} />
      )}
      <Button title={reserved ? "Reserved" : "Reserve"} onPress={toggleReserved} />
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    LinearGradient: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
      },
    container: { 
      flex: 1, 
      justifyContent: 'flex-start',
      marginTop: 120
     },
    image: {
        width: 200,
        height: 200,
        margin: 10
      },
    textDisplay: {
        margin: 10,
        fontSize: 20
    }
});

export default MadDetaljer;
