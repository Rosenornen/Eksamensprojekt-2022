import * as React from 'react';
import { View, Text, Platform, FlatList, StyleSheet, Button, Alert } from 'react-native';
import firebase from 'firebase';
import {useEffect, useState} from "react";
import { LinearGradient } from 'expo-linear-gradient';

const MadDetaljer = ({route,navigation}) => {
    const [food,setFood] = useState({});

    useEffect(() => {
        /*Henter food values og sætter dem*/
        setFood(route.params.food[1]);

        /*Når vi forlader screen, tøm object*/
        return () => {
            setFood({})
        }
    });


    if (!food) {
        return <Text>No data</Text>;
    }

    //all content
    return (
        <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
       <View style={styles.container}>
            {
                Object.entries(food).map((item,index)=>{
                    return(
                        <View style={styles.row} key={index}>
                            {/*Vores food keys navn*/}
                            <Text style={styles.label}>{item[0]} </Text>
                            {/*Vores food values navne */}
                            <Text style={styles.value}>{item[1]}</Text>
                        </View>
                    )
                })
            }
        </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({

  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },  
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 200,
    height: 200,
    margin: 10
  },

});

const styles = StyleSheet.create({
    LinearGradient: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
      },
    container: { 
      flex: 1, 
      justifyContent: 'flex-start',
      marginTop: 120
     },
    row: {
        margin: 5,
        padding: 5,
        flexDirection: 'row',
    },
    label: { 
      width: 100, 
      fontWeight: 'bold'
    },
    value: { 
      flex: 1 
    },
});