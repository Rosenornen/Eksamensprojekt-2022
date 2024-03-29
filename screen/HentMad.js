// Import af diverse dependencies og componenter
import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, Image} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

// Funktion, der danner overblik hvilken form for mad, som man kan hente
const MadListe = ({navigation}) => {

    const [foods,setFoods] = useState()

// Tjekker i database om der er Madopslag eller ej 
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
        // Man bliver sent til MadDetaljer, når man klikker på et madopslag 
        navigation.navigate('MadDetaljer', { food });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores foods objekt, og bruger som array til listen
    const foodArray = Object.values(foods);
    const foodKeys = Object.keys(foods);

    // View til HentMad 
    return (
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
  
        <View style = {styles.container}>
          <Text style = {styles.header}>Hent Mad</Text>
           <FlatList
            data={foodArray}
            // Vi bruger FoodKeys til at finde ID på det aktuelle food og returnerer dette som key, og giver det med som ID til FoodListItem
            keyExtractor={(item, index) => foodKeys[index]}
            renderItem={({ item, index }) => {
                return(
                    <TouchableOpacity style={styles.foodItem} onPress={() => handleSelectFood(foodKeys[index])}>
                        <Text style={styles.madPåDisplay}>
                             Hvem: {item.hvem}
                        </Text>
                        <Text style={styles.madPåDisplay}>
                             Tidspunkt: {item.afhentningstidspunkt}
                        </Text>
                        <Text style={styles.madPåDisplay}>
                             Hvor: {item.hvor}
                        </Text>
                        <Text style={styles.madPåDisplay}>
                             Madvare:{item.hvad}
                        </Text>
                        {item.image && (
        <Image source={{ uri: item.image }} style={styles.image} />
      )}
                    </TouchableOpacity>
                )
            }}
        />
        </View>
        </LinearGradient>
       
    );
}

// export af filen, så det kan bruges andre steder
export default MadListe;

// Style Sheet til MadListe 
const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 120,
      padding: 5
    },
    empty: {
        justifyContent: 'center',
        marginTop: 120
    },
    madPåDisplay:{
        fontWeight: "bold",
        marginLeft: 70,
    },
    foodItem: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 100,
        width: 300,
        justifyContent:'center',
        alignItems: 'center'
    },
    label: { fontWeight: 'bold' },
    image: {
        width: 60,
        height: 60,
        margin: 20,
        position: 'absolute',
        right: "70%",
        borderRadius: 50
    },
    header: {
        fontSize: 40,
        margin: 20
      },
});