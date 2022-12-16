
import {StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';


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
          <Text style={styles.Details}> ID: {auth.currentUser?.uid}</Text>
          <Text style={styles.Details2}> Email: {auth.currentUser?.email}</Text>
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
  }

})