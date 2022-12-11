
import {StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import Baggrund from "../assets/Baggrundmindre.png"
import styled from 'styled-components/native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { auth } from '../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';



export default function Home() {

    const navigation = useNavigation()

  /* Liiidt for simple logud, men det var nødvendigt for at teste */
    return (
      <>
      <StatusBar style ="light"/>
         <ImageBackground source={Baggrund} resizeMode="stretch"></ImageBackground>
         <View>
          <Text>DET HER ER CHAT</Text>
         </View>
        </>
    )
  }
  
  const ImageBackground = styled.ImageBackground`
      flex: 1;
      height: 100%
  `
  
  const styles = StyleSheet.create({
      Text:{
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center"
      },
      logud:{
        alignItems: 'center',
        justifyContent: "center",
      },
      userDetails:{
        alignSelf: "center",
        justifyContent: "center",
      }
  
  })