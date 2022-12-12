import * as React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";

const FoodList = ({navigation}) => {

    const [foods,setFoods] = useState()

    useEffect(() => {
        if(!foods) {
            firebase
                .database()
                .ref('/Food/')
                .on('value', snapshot => {
                    setFoods(snapshot.val())
                });
        }
    },[]);

    // Vi viser ingenting hvis der ikke er data
    if (!foods) {
        return <Text>Loading...</Text>;
    }

    const handleSelectFood = id => {
        /*Her søger vi direkte i vores array af foods og finder food objektet som matcher idet vi har tilsendt*/
        const food = Object.entries(foods).find( food => food[0] === id /*id*/)
        navigation.navigate('Food Details', { food });
    };

    // Flatlist forventer et array. Derfor tager vi alle values fra vores foods objekt, og bruger som array til listen
    const foodArray = Object.values(foods);
    const foodKeys = Object.keys(foods);

    return (
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
                             {item.Hvem}   {item.Hvor}   {item.Hvad}   {item.Id_}
                        </Text>
                    </TouchableOpacity>
                )
            }}
        />
        </View>
       
    );
}

export default FoodList;


const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      marginTop: 40,
      padding: 5
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