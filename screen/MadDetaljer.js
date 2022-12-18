import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';


export default function MadDetaljer() {
  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
             <Text>DET HER ER MAD DETALJERNE</Text>
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