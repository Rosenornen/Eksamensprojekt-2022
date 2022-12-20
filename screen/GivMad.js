
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
import React from 'react'
import { auth, db, firebase } from "../firebase"
import { LinearGradient } from 'expo-linear-gradient';
import UploadScreen from '../components/UploadSceen';

const GivFood = ({navigation, route}) => {

  const initialState = {
    Id_: auth.currentUser?.uid,
    Hvem: '',
    Hvor: '',
    Hvad: '',
    Info: '',
    Madtype: '',
    Foto: ''
  }

  const [newFood, setNewFood] = useState(initialState);

  /*Returnere true, hvis vi er på edit food*/
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

    const { Id_, Hvem, Hvor, Hvad, Info, Madtype, Foto} = newFood;

    if(Id_ === auth.currentUser?.uid,Hvem.length === 0, Hvor.length === 0, Hvad.length === 0, Info.length === 0, Madtype.length === 0, Foto.length === 0){
      return Alert.alert('Alle felter skal udfyldes')
    }
    if(isEditFood){
      const id = route.params.food[0];
      try{
        firebase
          .database()
          .ref(`/Food/${id}`)
          .update({Id_, Hvem, Hvor, Hvad, Info, Madtype, Foto});
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
          .push({Id_, Hvem, Hvor, Hvad, Info, Madtype, Foto,})
        Alert.alert(`Saved`);
        setNewFood(initialState)
      } catch(error) {
        console.log(`Error: ${error.message}`)
      }
    }
  }
  return (
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <SafeAreaView>
        <View style={styles.row}>
                <Text style={styles.label}>Hvem</Text>
                <TextInput value={newFood.Hvem}style={styles.input} onChangeText={(event) => changeTextInput('Hvem', event)} />
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Hvor</Text>
                <TextInput value={newFood.Hvor} onChangeText={(event) => changeTextInput('Hvor', event)} style={styles.input} multiline={true}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Hvad</Text>
                <TextInput value={newFood.Hvad} onChangeText={(event) => changeTextInput('Hvad', event)} style={styles.input} multiline={true}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Info</Text>
                <TextInput value={newFood.Info} onChangeText={(event) => changeTextInput('Info', event)} style={styles.input} multiline={true}/>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Madtype</Text>
                <TextInput value={newFood.Madtype} onChangeText={(event) => changeTextInput('Madtype', event)} style={styles.input} multiline={true}/>
            </View> 
            <View style={styles.row}>
                <Text style={styles.label}>Foto</Text>
                <TextInput value={newFood.Foto} onChangeText={(event) => changeTextInput('Foto', event)} style={styles.input} multiline={true}/>
            </View>                                   
            <Button title={ isEditFood ? "Save changes" : "Add Food"} onPress={() => handleSave()} />
        </SafeAreaView>
        </LinearGradient>
);
}

export default GivFood;

const styles = StyleSheet.create({
LinearGradient: {
  flex: 1,
  justifyContent: 'center',
  padding: 10
},
container: {
  marginTop: 120
},
row: {
    flexDirection: 'row',
    height: 30,
    margin: 15
},
label: {
    fontWeight: 'bold',
    width: 100
},
input: {
    borderWidth: 1,
    padding: 12,
    flex: 1,
    margin: -5,
    
},
});