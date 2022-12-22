// Import af diverse dependencies
import styled from 'styled-components/native'
import { auth } from "../firebase"
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

const Container = styled.View`
        flex: 1;
        background-color black;
        justify content: center,
        align-items: center
`

// Hvis bruger er logget ind = vis Home Screen
// Hvis bruger ikke er logget ind = vis Login Screen
const Splash = ({navigation}) => {
      
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          navigation.replace("BottomStack")
        } else { 
          navigation.replace("Login")
        }
      })
        return() => {
          unsubscribe();
        }

  }, [])


  return (
        <>
        <StatusBar style='light'/>
        <Container /> 
        </>
  )     
}

// export af filen, så det kan bruges andre steder
export default Splash
