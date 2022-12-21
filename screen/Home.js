import {StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'

export default function Home() {  
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    // Make sure the user is authenticated
    if (firebase.auth.currentUser) {
      // Get the current user's ID
      const userId = firebase.auth.currentUser.uid;

      // Use the user's ID to retrieve the user's full name from the database
      const userRef = firebase.database().ref(`User/${userId}`);
      userRef.on('value', snapshot => {
        const user = snapshot.val();
        // Make sure the user object is not null
        if (user) {
          setFullName(user.fullName);
          console.log(fullName); // print the value of fullName to the console
        }
      });
    }
  }, []);

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
        <Text style={styles.overskrift}>VELKOMMEN TILBAGE {fullName} </Text>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container:{
    flex: 1
  },
  overskrift:{
    top: "20%",
  }
})