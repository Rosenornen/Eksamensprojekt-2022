// Import af diverse dependencies og componenter
import * as React from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, Alert } from 'react-native';
import { auth, firebase } from "../firebase"
import {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

const MadDetaljer = ({route,navigation}) => {
  const [food,setFood] = useState({});
  const [reserved, setReserved] = useState(false);
  const [users, setUsers] = useState([]);
  const [newAfhentningstidspunkt, setNewAfhentningstidspunkt] = useState('');

  useEffect(() => {
      /*Henter food values og sætter dem*/
      setFood(route.params.food[1]);

      /*Når vi forlader screen, tøm object*/
      return () => {
          setFood({})
      }
  });

  //Følgende kode fungerer i backend, men får vores simulator til at crashe, derfor har vi valgt at undlade den, selvom det i back-enden virker og sætter værdien til false og fjerner ID.
  {/*
  const cancelReservation = () => {
    try {
      // Update the database to cancel the reservation
      firebase.database().ref(`MadTilAfhentning/${food.id}`).update({
        reserved: false, // Set reserved to false
        userwhoreserved: "" // Set userwhoreserved to an empty string
      });
      setReserved(false); // Update the component's reserved state to false
      Alert.alert(
        "Du har nu afreserveret madvaren",
        [{ text: "OK" }]
      );
    } catch (error) {
      // Handle any errors that may occur when updating the database
      console.error(error);
      Alert.alert(
        "Fejl",
        "Der opstod en fejl ved afreservering af madvaren. Prøv igen.",
        [{ text: "OK" }]
      );
    }
  }

*/} 

///SKAL TILFØJES SÅ MAN KAN VÆLGE DET FOOD ID MAN ER INDE
const toggleReserved = () => {
  if (reserved) {
    // If already reserved, do nothing
    return ; 
  }

  firebase.database().ref(`MadTilAfhentning/${food.id}`).update({
      reserved: !reserved,
      userwhoreserved: auth.currentUser?.uid
  });
  setReserved(!reserved);
}

  if (!food) {
      return <Text
>No data</Text>;
  }

  // Fetch updated data after update button is clicked
  const refreshData = () => {
    firebase.database().ref(`MadTilAfhentning/${food.id}`).once('value', snapshot => {
      setFood(snapshot.val());
    });
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
<Button
  disabled={food.reserved}
  title={food.reserved ? "Reserved" : "Reserver"}
  onPress={() => {
    toggleReserved();
    Alert.alert(
      "Tillykke",
      "Du har reserveret denne, kontakt den anden bruger for at få detaljerne på plads",
      [{ text: "OK" }]
    );
    navigation.navigate('BottomStack');
  }}
  color={food.reserved ? "red" : "lightgreen"}
/>
{/* Følgende knap er undladt og refferer til den anden kommentering højere op under cancel.
{auth.currentUser?.uid === food.userwhoreserved && (
  <Button
    title="Aflys reservation"
    onPress={cancelReservation}
    color="red"
  />
)}
*/}
{auth.currentUser?.uid === food.Id_ && (
  <View>
    <TextInput
      value={newAfhentningstidspunkt}
      onChangeText={text => setNewAfhentningstidspunkt(text)}
      placeholder="Indtast nyt afhentningstidspunkt"
    />
    <Button title="Update" onPress={() => {
      // Perform update operation here
      Alert.alert("Tidspunktet blev opdateret")
      firebase.database().ref(`MadTilAfhentning/${food.id}`).update({
        afhentningstidspunkt: newAfhentningstidspunkt,
        // Update other properties as needed
      });
      // Fetch updated data
      refreshData();
    }} />
   <Button title="Delete" onPress={() => {
      // Display alert before performing delete operation
      Alert.alert(
        'Slet opslag',
        'Er du sikker på du vil slette opslaget?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              // Perform delete operation here
              firebase.database().ref(`MadTilAfhentning/${food.id}`).remove();
              Alert.alert('Opslaget blev slettet');
              navigation.navigate('BottomStack');
            },
          },
        ],
        {cancelable: false},
      );
    }} />
  </View>
)}
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
      justifyContent: "center",
      alignItems: "center",
      marginTop: 80
     },
    image: {
        width: 200,
        height: 200,
        margin: 10,
        borderRadius: 10,
      },
    textDisplay: {
        alignContent: "center",
        margin: 10,
        fontSize: 20,
        fontWeight: "bold"
    }
});

export default MadDetaljer;
