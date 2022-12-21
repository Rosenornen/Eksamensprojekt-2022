import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
  const [fullName, setFullName] = useState('');
  const [orderCount, setOrderCount] = useState(0); // Add state to store the order count
  const [foods, setFoods] = useState(); // Initialize foods as undefined

  useEffect(() => {
    firebase.database().ref('/MadTilAfhentning/') // Fetch data from the /MadTilAfhentning/ path
      .once('value')
      .then(snapshot => {
        const values = Object.values(snapshot.val()); // Get an array of all the values in the data
        const userOrders = values.filter(value => value.Id_ === firebase.auth().currentUser.uid); // Filter the array based on the current user's ID
        setOrderCount(userOrders.length); // Set the order count using the length of the filtered array
      });
  }, [foods]); // Only run this effect when the value of foods changes

  useEffect(() => {
    firebase.database().ref('/User/' + firebase.auth().currentUser.uid)
      .once('value')
      .then(snapshot => {
        if (snapshot.val()) {
          setFullName(snapshot.val().fullName);
        } else {
          // Handle case where data does not exist
        }
      });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.velkommenTilbageTekst}>
      <Text style={styles.container}>
        <Text style={styles.label}>Velkommen tilbage </Text>
        <Text style={styles.fullName}>{fullName}</Text>
      </Text>
      <View style={styles.orderCountContainer}>
        <Text style={styles.orderCountText}>Du har {orderCount} aktive opslag!</Text>
        <Text style={styles.orderCountCO2}>Du har sparet {orderCount * 1.25} KG CO2</Text>
    end={{ x: 1, y: 1 }}>
      <View style={styles.container}>
      <Text style={styles.label}>Current user:</Text> <Text style={styles.fullName}>{fullName}</Text>
      </View>
    </View>
  </LinearGradient>
  )
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  velkommenTilbageTekst:{
    marginTop: "-65%",
    alignItems: "center"
  }, 
  orderCountContainer:{
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignItems: "center",
    justifyContent: 'center',
    marginTop: "5%",
    padding: 15,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1
  container:{
    flex: 1
  },
  overskrift:{
    top: "20%",
  },
  label: {
    fontSize: 18,
    color: '#333',
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: "underline",
    color: '#333',
  },
  orderCountText: {
    fontSize: 16,
    color: '#333',
    marginTop: 20,
    textDecorationLine: "underline",
    marginBottom: 5
  },
  orderCountCO2:{
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgreen",
    }
})