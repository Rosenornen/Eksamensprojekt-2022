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

//If user is logged in, homescreen, if not login screen
const Splash = ({navigation}) => {
      
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser) {
          /* Er ændret fra Register til BottomStack tester */
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
