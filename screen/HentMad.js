import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

const MadListe = ({navigation}) => {

    const [foods,setFoods] = useState()

    useEffect(() => {
        if(!foods) {
            firebase
                .database()
                .ref('/MadTilAfhentning/')
                .on('value', snapshot => {
                    setFoods(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!foods) {
        return <Text style = {styles.empty}>Loading...</Text>;
    }

    const handleSelectFood = id => {
        /*Her søger vi direkte i vores array af foods og finder food objektet som matcher idet vi har tilsendt*/
        const food = Object.entries(foods).find( food => food[0] === id /*id*/)
        navigation.navigate('MadDetaljer', { food });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores foods objekt, og bruger som array til listen
    const foodArray = Object.values(foods);
    const foodKeys = Object.keys(foods);

    return (
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
  
        <View style = {styles.container}>
          <Text></Text>
           <FlatList
            data={foodArray}
            // Vi bruger FoodKeys til at finde ID på det aktuelle food og returnerer dette som key, og giver det med som ID til FoodListItem
            keyExtractor={(item, index) => foodKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.foodItem} onPress={() => handleSelectFood(foodKeys[index])}>
                        <Text>
                             {item.Hvem}   {item.Hvor}   {item.Hvad}  {item.Id_}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
        </View>
        </LinearGradient>
       
    );
}

export default MadListe;


const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    container: {
      justifyContent: 'center',
      marginTop: 120,
      padding: 5
    },
    empty: {
        justifyContent: 'center',
        marginTop: 120
    },
    foodItem: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
    label: { fontWeight: 'bold' },
});