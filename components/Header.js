  /* Skal fungerer som en customized header som kan bruges til nav, search og sign out*/


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {AntDesign, MaterialIcons, Ionicons, FontAwesome, FontAwesome5} from "@expo/vector-icons";

import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-web';

const Header = ({login, goBack, label}) => {

    const navigation = useNavigation();

    return login (
      <Container>
        <HeaderLeftSide>
          {
              goBack ? (
                <TouchableOpacity style={{marginLeft: 10}} onPress={goBack}>
                  <AntDesign name ="arrowleft" size={24} color="white" />
                </TouchableOpacity>
              ) : (
                  <Logo resizeMode="contain" source={require("../assets/Splash2.png")} />
              )
          }
          {
             label && (
                <HeaderTitle>{label}</HeaderTitle>
             )
          }
        </HeaderLeftSide>
        <HeaderIcons>
          {
            goBack ? (
                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                  navigation.navigate("Home")
                }}>
                  <MaterialIcons name="search" size={15} color="white" style={{marginRight: 15}} />
                </TouchableOpacity>
                ) : (
                  <TouchableOpacity activeOpacity={0.5} onPress={() => {
                    navigation.navigate("Home")
                  }}>
                   <MaterialIcons name="search" size={15} color="white" style={{marginRight: 15}} />

                  </TouchableOpacity>
                )
          }
        </HeaderIcons>
        </Container>
    )

}

export default Header