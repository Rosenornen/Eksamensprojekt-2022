// Import af diverse dependencies og componenter
import {StyleSheet, Text, View, TextInput, Alert, Pressable} from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { auth, firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {Ionicons} from "@expo/vector-icons";

// Forksellige boliger, der bruges i en dropdown menu længere nede 
const data = [
  { label: 'Kollegiet Egmont', value: '1' },
  { label: 'Tietgen', value: '2' },
  { label: 'Ejerforening EHV 17-29', value: '3' },
  { label: 'Stålkollegiet', value: '4' },
];

// Alt funktionalitet i settings 
function Settings({navigation, route}) {

// Log ud funktion 
  const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
}

  const [fullName, setFullName] = useState('');
  const [home, setHome] = useState('');
  const [homegroup, setHomegroup] = useState('');
  const email = auth.currentUser?.email;
  const Id_ = auth.currentUser?.uid;

  // Funktion til at oprette mere data om ens profil
  function uploadData() {
    if (!home || !fullName || !homegroup || !email || !Id_) {
      // Error Alert, hvis der mangler data 
      return Alert.alert('Alle Felter skal udfyldes');
    }

    // Indsætter data i Firebase Realtime Database
    firebase.database().ref('/User/' + auth.currentUser?.uid).set({
      home,
      fullName,
      homegroup,
      email,
      Id_
    });
    Alert.alert(`Gemt`);;
    setFullName('')
    setHome('')
    setHomegroup('')
  }


  const [checked, setChecked] = React.useState('true');
  
  // Alt indhold vist i appen fra Settings.js
    return (
      <>
      <StatusBar style ="light"/>
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.textContainer}>
        <Text style={styles.User}> Du er logget ind som:</Text>
        <Text style={styles.Details}> Email: {auth.currentUser?.email}</Text>
        </View>
        <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={150}
        showsVerticalScrollIndicator="true"
        labelField="label"
        valueField="value"
        placeholder="Find dit lokalområde"
        searchPlaceholder="Søg..."
        value={data}
        onChange = {setHomegroup}
        renderLeftIcon={() => (
          <Ionicons style={styles.icon} color="black" name="home" size={20} />
        )}
      />
      <View style={styles.textInputContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setFullName}
        value={fullName}
        placeholder="Indsæt dit navn, så dine naboer kan kende dig"
      />
      <TextInput
        style={styles.input}
        onChangeText= {setHome}
        value={home}
        placeholder="Din adresse indenfor dit lokalområde"
      />
      </View>
      
      <Text style={styles.privacyOverskrift}>BETTINGELSER</Text>
      <View style={styles.privacy}>
      <RadioButton.Android
        value="true"
        status={ checked === 'true' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('true')}
        color="green"
      />
      <Text style={styles.privacyText}> Accepter</Text>
      <RadioButton.Android
        value="false"
        status={ checked === 'false' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('false') & Alert.alert("Du skal acceptere betingelserne for at bruge appen") & setChecked("true")}
        color="red"
      />
      <Text style={styles.privacyText}> Afvis</Text>
      </View>

          <View style={styles.buttonContainer}>
          <Pressable style={styles.logudButton} onPress={handleSignOut}><Text style={styles.logudText}>Log ud</Text></Pressable>
          <Pressable style={styles.saveButton} onPress={() => uploadData()}><Text style={styles.saveText}>Gem indhold</Text></Pressable>
          </View>
          

      </LinearGradient>
      </>
    )
  }

// StyleSheet til Settings.js
const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer:{
    alignContent: "center",
    alignItems: 'center',

  },
  textInputContainer:{
    alignContent: "center",
    alignItems: 'center',
  },
  dropdown: {
    margin: 15,
    height: 50,
    width: "75%",
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderRadius: 4,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 12,
    borderRadius: 4,
  },
  Details:{
    fontSize: 11,
    lineHeight: 10,
    margin: 2,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  User:{
    fontSize: 15,
    lineHeight: 10,
    letterSpacing: 0.25,
    color: 'black',
    padding: 10
  },
  input: {
    height: 40,
    margin: 10,
    borderWidth: 1.5,
    padding: 10,
    borderColor: "black",
    borderRadius: 4,
  },
  privacy: {
    borderWidth: 1.5,
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 4,
  },
  privacyText:{
    justifyContent: "center",
    fontStyle: "italic",
    fontWeight: "bold"
  },
  privacyOverskrift:{
    fontWeight: "bold",
    marginBottom: 5,
    alignContent: "center"
  },
  buttonContainer:{
    flexDirection: "row",
    marginTop: 20,
    
  },
  saveButton:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: "5%",
    marginLeft: 50,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: 'lightgreen',
  },
  saveText:{
    fontWeight: "bold"
  },
  logudButton:{
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: "10%",
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: 'red',
  },
  logudText:{
    fontWeight: "bold"
  }
})

// export af filen, så det kan bruges andre steder
export default Settings
