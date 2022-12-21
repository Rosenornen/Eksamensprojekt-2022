import {StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useEffect } from 'react';
import { auth, firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'


export default function Home() {  
  
  const [users, setUsers] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const userRef = 
    firebase
    .database()
    .ref('User');
    userRef.on('value', snapshot => {
      const user = snapshot.val();
      setFullName(user.fullName);
    });
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