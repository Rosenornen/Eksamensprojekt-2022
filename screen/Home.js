import {StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const unsubscribe = firebase.database().ref('/User/' + firebase.auth().currentUser.uid)
      .on('value', snapshot => {
        setFullName(snapshot.val().fullName);
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
      <Text style={styles.label}>Current user:</Text> <Text style={styles.fullName}>{fullName}</Text>
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
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
})