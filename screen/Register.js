// Import af diverse dependencies og componenter
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import styled from 'styled-components/native'
import Baggrund from "../assets/BaggrundLogin_Register.png"
import { auth } from '../firebase';
import { Alert } from 'react-native';


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

 
const Register = ({navigation}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSignUp = async() => {
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials =>{
       const user = userCredentials.user;
       Alert.alert('Du har nu oprettet dig')
       navigation.replace("Login");
       console.log("Registered følgende bruger: ", user.email)
      })
      .catch(error => alert(error.message))
   }

/* Kunne indsætte Confirm password hvis tid */
return (
    <>
    <StatusBar style ="light"/>
      <Container>
       <ImageBackground source={Baggrund} resizeMode="cover">
            <Overlay>
              <FormWrapper>
                <Form>
                  <SignInText> Opret dig her</SignInText>
                  <Input placeholder="Indtast din Email" placeholderTextColor="grey" value={email} onChangeText={text => setEmail(text)}/>
                  <Input placeholder="Indtast dit password" placeholderTextColor="grey" secureTextEntry value={password} onChangeText={text => setPassword(text)}/>
                  <SubmitForm activeOpacity ={0.5} onPress={handleSignUp} disabled={loading}><ButtonText>{loading? "Loading..." : "Opret dig"}</ButtonText></SubmitForm>
                  <NewToFoodBeeTextWrapper activeOpacity={0.5} onPress={() => navigation.navigate("Login")}><NewToFoodBee>Allerede medlem? Log ind nu!</NewToFoodBee></NewToFoodBeeTextWrapper>

                </Form>
              </FormWrapper>
            </Overlay>
         </ImageBackground>
        </Container>
    </>
  )
}

// export af filen, så det kan bruges andre steder
export default Register
