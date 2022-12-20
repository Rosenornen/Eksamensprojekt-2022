
import {StyleSheet, Text, View, Button, TextInput} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';


export default function Settings() {

  const handleSignOut = () => {
    auth
        .signOut()
        .then(() => {
            navigation.replace("Login")
        })
        .catch(error => alert(error.message))
}

    const navigation = useNavigation()
    const [name, setName] = React.useState(null);
    const [home, setHome] = React.useState(null);
    //const [privacy, setPrivacy] = React.useState(true);
    const [checked, setChecked] = React.useState('true');


  /* Liiidt for simple logud, men det var nødvendigt for at teste */
    return (
      <>
      <StatusBar style ="light"/>
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.User}> Brugeren som er logget ind:</Text>
        <Text style={styles.Details2}> Email: {auth.currentUser?.email}</Text>


      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Indsæt dit navn, så dine naboer kan kende dig"
      />
      <TextInput
        style={styles.input}
        onChangeText={setHome}
        value={home}
        placeholder="Din adresse"
      />
      <Text style={styles.privacyOverskrift}>Privacy Settings</Text>
      <View style={styles.privacy}>
      <RadioButton
        value="true"
        status={ checked === 'true' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('true')}
        color="orange"
      />
      <Text style={styles.privacyText}> Accepter</Text>
      <RadioButton
        value="false"
        status={ checked === 'false' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('false')}
      />
      <Text style={styles.privacyText}> Afvis</Text>

    </View>
          <Text style={styles.Details}> ID: {auth.currentUser?.uid}</Text>
          <Button style={styles.logud} title='Tryk for at logge ud' onPress={handleSignOut}></Button>
      </LinearGradient>
      </>
    )
  }

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logud:{
    
  },
  Details:{
    fontSize: 11,
    lineHeight: 10,
    margin: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  Details2:{
    fontSize: 11,
    lineHeight: 10,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    padding: 10
  },
  
  User:{
    fontSize: 10,
    lineHeight: 10,
    letterSpacing: 0.25,
    color: 'black',
    padding: 10
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  privacy: {
    borderWidth: 1,
    alignItems: "center",
    width: "30%",
    flexDirection: "row",
    flexWrap: "wrap",

  },
  privacyText:{
    justifyContent: "center",
    fontStyle: "italic"
  },
  privacyOverskrift:{
    fontWeight: "bold",
    padding: 2,
  },

})