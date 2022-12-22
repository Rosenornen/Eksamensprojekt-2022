// Import af diverse dependencies og componenter
import {StyleSheet} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import UploadContext from '../components/UploadContext';

function GivMad() {  
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

// export af filen, så det kan bruges andre steder
export default GivMad
