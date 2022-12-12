
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useEffect, useState} from "react";
import firebase from 'firebase';
import React from 'react'
import { auth } from '../firebase';
import { db } from '../firebase';

const GivFood = ({navigation, route}) => {

  const initialState = {
    Hvem: '',
    Hvor: '',
    Hvad: '',
    Info: '',
    Madtype: '',
    Foto: ''
  }

  const [newFood, setNewFood] = useState(initialState);

  /*Returnere true, hvis vi er på edit car*/
  const isEditFood = route.name === "Edit Food";

  useEffect(() => {
      if(isEditFood){
          const food = route.params.food[1];
          setNewFood(food)
      }
      /*Fjern data, når vi går væk fra screenen*/
      return () => {
          setNewFood(initialState)
      };
  }, []);

  const changeTextInput = (name,event) => {
    setNewFood({...newFood, [name]: event});
  }   

  const handleSave = () => {

    const { Hvem, Hvor, Hvad, Info, Madtype, Foto} = newFood;

    if(Hvem.length === 0, Hvor.length === 0, Hvad.length === 0, Info.length === 0, Madtype.length === 0, Foto.length === 0){
      return Alert.alert('Alle felter skal udfyldes')
    }
    if(isEditFood){
      const id = route.params.food[0];
      try{
        firebase
          .database()
          .ref(`/Food/${id}`)
          .update({Hvem, Hvor, Hvad, Info, Madtype, Foto});
        Alert.alert('Din info er blevet opdateret');
        const food = [id, newFood];
        navigation.navigate('Food Details', {food});
      } catch(error) {
        console.log(`Error: ${error.message}`)
      }
    } else {
      try {
        firebase
          .database()
          .ref('/Food/')
          .push({Hvem, Hvor, Hvad, Info, Madtype, Foto})
        Alert.alert(`Saved`);
        setNewFood(initialState)
      } catch(error) {
        console.log(`Error: ${error.message}`)
      }
    }
  }
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            {
                Object.keys(initialState).map((key,index) =>{
                    return(
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{key}</Text>
                            <TextInput
                                value={newFood[key]}
                                onChangeText={(event) => changeTextInput(key,event)}
                                style={styles.input}
                            />
                        </View>
                    )
                })
            }
            {/*Hvis vi er inde på edit car, vis save changes i stedet for add car*/}
            <Button title={ isEditFood ? "Save changes" : "Add Food"} onPress={() => handleSave()} />
        </ScrollView>
    </SafeAreaView>
);
}

export default GivFood;

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center'
},
row: {
    flexDirection: 'row',
    height: 30,
    margin: 10,
},
label: {
    fontWeight: 'bold',
    width: 100
},
input: {
    borderWidth: 1,
    padding:5,
    flex: 1
},
});