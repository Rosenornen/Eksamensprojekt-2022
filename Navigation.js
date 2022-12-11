import {Text, Dimensions } from "react-native";

import HomeComponent from './components/HomeComponent';
import ProfileComponent from './components/ProfileComponent';
import DetailsComponent from './components/DetailsComponent';
import ActionComponent from './components/ActionComponent';
import { createStackNavigator } from "@react-navigation/stack";


const fullScreenWidth = Dimensions.get("window").width

const Stack = createStackNavigator();

function HomeStackComponent() {
    return(
        Stack
    )
}