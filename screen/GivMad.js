import {StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { auth } from '../firebase';
import { db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'
import UploadContext from '../components/UploadContext';

export default function Home() {  
  
  


    return (
      <LinearGradient
      colors={['#fce24e', 'white']}
      style={styles.LinearGradient}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}>
      <UploadContext/>
      </LinearGradient>
    )
  }
  
  const styles = StyleSheet.create({
    LinearGradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  })