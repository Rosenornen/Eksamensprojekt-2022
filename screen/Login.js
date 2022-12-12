import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Text, KeyboardAvoidingView, Platform } from 'react-native'
import styled from 'styled-components/native'
import Baggrund from "../assets/BaggrundLogin_Register.png"
import { auth } from '../firebase';


const Login = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const login = () => {
        setLoading(true);
        if(!email || !password) {
            alert("Alle felter skal udfyldes");
            setPassword("");
            setEmail("");
            setLoading(false)
            return;
        }

        /*Her sender jeg brugeren videre til min bottomstack screen, altså min tab-navigator for at de kan anvende denne til at bruge appen bagefter.*/

        auth.signInWithEmailAndPassword(email,password).then(authUser => {
            navigation.replace("BottomStack");
            setPassword("");
            setEmail("");
            setLoading(false)
        }).catch(err =>{
            setLoading(false);
            alert(err)
        })
    }

  return (
    <>
    <StatusBar style ="light"/>
      <Container>
       <ImageBackground source={Baggrund} resizeMode="cover">
            <Overlay>
              <FormWrapper>
                <Form>
                  <SignInText> Log Ind her</SignInText>
                  <Input placeholder="Indtast din Email" placeholderTextColor="grey" value={email} onChangeText={text => setEmail(text)}/>
                  <Input placeholder="Indtast dit password" placeholderTextColor="grey" secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
                  <SubmitForm activeOpacity ={0.5} onPress={login} disabled={loading}><ButtonText>{loading? "Loading..." : "Log Ind"}</ButtonText></SubmitForm>
                  <NewToFoodBeeTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Register")}><NewToFoodBee>Nyt medlem af FoodBee ? Opret dig</NewToFoodBee></NewToFoodBeeTextWrapper>
                </Form>
              </FormWrapper>
            </Overlay>
         </ImageBackground>
        </Container>
    </>
  )
}


const Container = styled.ScrollView`
	flex: 1;
    background-color: #000;
`
const FormWrapper = styled.View`
    width: 100%;
    justifyContent: center;
    alignItems: center;
    height: 85%;
`

const Form = styled.View`
    height: 350px;
    width: 90%;
    background-color: black;
    flex-direction: column;
    border-radius: 20px;
    padding: 20px;
    justify-content: center;
`

const SubmitForm = styled.TouchableOpacity`
    width: 95%;
    height: 50px;
    color: white;
    border-radius: 10px;
    border: none;
    justify-content: center;
    align-items: center
    margin-top: 20px;
    background-color: orange;
`

const Input = styled.TextInput`
    width: 95%;
    height: 50px;
    border: none;
    padding: 10px;
    border-radius: 15px;
    background-color: #333333;
    color: white;
    margin-top: 10px;
`

const ButtonText = styled.Text`
	font-size: 15px;
	font-weight: bold;
    padding-left: 5px;
    color: white;
`
const SignInText = styled.Text`
font-size: 30px;
font-weight: bold;
color: white;
margin: 10px;
text-align: center;
`

const NewToFoodBeeTextWrapper = styled.TouchableOpacity`
    width: 100%;
`

const NewToFoodBee = styled.Text`
font-size: 15px;
font-weight: 500;
text-align: center;
color: #ccc;
margin: 15px;
justify-content: center;
`

const Overlay = styled.View`
    background-color: 'rgba(0,0,0,0.1)';
    flex: 1;
`

const ImageBackground = styled.ImageBackground`
    flex: 1;
    height: 1000px
`


export default Login

