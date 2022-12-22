import {KeyboardAvoidingView, Platform, Image } from 'react-native';
import {NavigationContainer} from "@react-navigation/native" 
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Login from "./screen/Login"
import Register from './screen/Register';
import Splash from './screen/Splash';
import Home from './screen/Home';
import Settings from './screen/Settings';
import HentMad from './screen/HentMad';
import GivMad from './screen/GivMad';
import ChatUserOverview from './components/ChatUserOverview';
import DirectMessage from './components/DirectMessage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MaterialIcons, Ionicons, FontAwesome, FontAwesome5} from "@expo/vector-icons";
import Chat from './screen/Chat';
import MadDetaljer from './screen/MadDetaljer';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
      
  function BottomStackScreen(){
    return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "orange",
        swipeEnabled: true,
        style:{
          tabBarActiveBackgroundColor: 'transparent',
          tabBarInactiveBackgroundColor: 'transparent',
          position: 'absolute',
          borderTopWidth: 0,
          elevation: 0,
        }
      }}
      screenOptions={{
        tabBarItemStyle: {flexDirection: "row"},
      }}
      >
        <Tab.Screen name="   " component={Home} options={{
          headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="ios-person" size={30} color={color} style={{marginLeft: 10, marginBottom: 25, marginTop: -20, }} />
        }} />
       <Tab.Screen name=" " component={Chat} options={{
        headerShown: false, tabBarIcon: ({ color }) => <Ionicons name="chatbox" size={30} color={color} style={{marginLeft: 10, marginBottom: 25, marginTop: -20, }} />
        }} />
         <Tab.Screen name="  " component={HentMad} options={{
           headerShown: false, tabBarIcon: ({ color }) => <FontAwesome name="recycle" size={30} color={color} style={{marginLeft: 10, marginBottom: 25, marginTop: -20, }} />
        }} />
        
        <Tab.Screen name="    " component={GivMad} options={{
          headerShown: false, tabBarIcon: ({ color }) => <FontAwesome5 name="hand-holding-heart" size={30} color={color} style={{marginLeft: 10, marginBottom: 25, marginTop: -15,}} />
        }} />
         <Tab.Screen name="     " component={Settings} options={{
          headerShown: false, tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={30} color={color} style={{ fontWeight: "bold", marginLeft: 10, marginBottom: 25, marginTop: -20, }} />
        }} />
      </Tab.Navigator>

    )
    
  }

  const screenOptions = {
    headershown: false,
    ...TransitionPresets.SlideFromRightIOS,
  }

  return (
    <NavigationContainer>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,}} keyboardVerticalOffset={Platform.OS ==='ios' ? -64 : 0} >
        <Stack.Navigator initialRouteName='Splash' screenOptions={screenOptions}>
          <Stack.Screen name="Login" component={Login} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
            headerShown: false,
              }}/> 
           <Stack.Screen name="Register" component={Register} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
            headerShown: false,
             }}/> 
             <Stack.Screen name="Splash" component={Splash} options={{
            gestureEnabled: true,
            animationEnabled: true,
            gestureDirection: "horizontal",
            headerShown: false,
            headerTransparent: true,

             }}/> 
             
             <Stack.Screen name="BottomStack" component={BottomStackScreen} options={{
            gestureEnabled: true,
            animationEnabled: true,
            title: "",
            headerTransparent: true,
            gestureDirection: "horizontal",
            headerTitle: () => (
              <Image style={{ marginTop: 10, width: 250, height: 250 }} source={require("./assets/Splash2.png")} />
            ), 
             }}/> 

             <Stack.Screen name = "GivMad" component={GivMad} options={{
              
                
                 }} /> 
             <Stack.Screen name = "HentMad" component={HentMad} options={{
                
                 }} /> 
             <Stack.Screen name = "Settings" component={Settings} options={{
                
                 }} /> 
             <Stack.Screen name = "Chat" component={Chat} options={{
                
                 }}/>  
              <Stack.Screen name = "DirectMessage" component={DirectMessage} options={{
                 gestureEnabled: true,
                 animationEnabled: true,
                 title: "",
                 headerTransparent: true,
                 gestureDirection: "horizontal",
                 headerTitle: () => (
                   <Image style={{ marginLeft: 110, marginTop: 10, width: 250, height: 250 }} source={require("./assets/Splash2.png")} />
                 ), 
              }}/>  
              <Stack.Screen name = "ChatUserOverview" component={ChatUserOverview} options={{
                
              }}/> 
              <Stack.Screen name = "MadDetaljer" component={MadDetaljer} options={{
                gestureEnabled: true,
                animationEnabled: true,
                gestureDirection: "horizontal",
                headerBackTitleVisible: false,
                headerTransparent: true,
                title: 'DETALJER ',
                headerTintColor: 'black',
                headerTitleStyle: {
                  fontWeight: 'bold',
                  fontSize: 25
                },
                headerRight: () => (
                  <Image style={{ marginRight: "-45%", width: 200, height: 200 }} source={require("./assets/Splash2.png")} />
                ),              
              }} /> 
        
          
        </Stack.Navigator>
    </KeyboardAvoidingView>
    </NavigationContainer>
    
  );
}

