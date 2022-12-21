import {StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'


export default function Home() {  
  
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/User/${userId}/fullName`).once('value')
      .then(snapshot => {
        setFullName(snapshot.val());
      });
      console.log(userId)
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