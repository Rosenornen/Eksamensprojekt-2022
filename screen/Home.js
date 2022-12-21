import {StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {  

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
        <Text style={styles.overskrift}>DASHBOARD</Text>
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