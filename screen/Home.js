// Import af diverse dependencies og componenter
import { StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

function Home() {
  const [fullName, setFullName] = useState('');
  const [orderCount, setOrderCount] = useState(0); // Add state to store the order count
  const [foods, setFoods] = useState(); // Initialize foods as undefined
  const [idOrderCount, setIdOrderCount] = useState(0);
  const [userwhoreservedOrderCount, setUserwhoreservedOrderCount] = useState(0);

  useEffect(() => {
    firebase.database().ref('/MadTilAfhentning/') // Fetch data from the /MadTilAfhentning/ path
      .once('value')
      .then(snapshot => {
        const values = Object.values(snapshot.val()); // Get an array of all the values in the data
        const currentUserId = firebase.auth().currentUser.uid;
        const idOrders = values.filter(value => value.Id_ === currentUserId); // Filter the array based on the current user's ID
        const userwhoreservedOrders = values.filter(value => value.userwhoreserved === currentUserId); // Filter the array based on the userwhoreserved property
        setIdOrderCount(idOrders.length); // Set the order count using the length of the filtered array
        setUserwhoreservedOrderCount(userwhoreservedOrders.length); // Set the order count using the length of the filtered array
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
  }, []); // This effect does not depend on any values, so we can pass an empty array

  useEffect(() => {
    firebase
      .database()
      .ref('/MadTilAfhentning/')
      .on('value', snapshot => {
        setFoods(snapshot.val());
      });
  }, []); // This effect does not depend on any values, so we can pass an empty array

  // If foods is not defined, show a loading message
  if (!foods) {
    return <Text style={styles.empty}>Loading...</Text>;
  }

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.velkommenTilbageTekst}>
      <Text style={styles.container}>
        <Text style={styles.label}>Velkommen </Text>
        <Text style={styles.fullName}>{fullName}</Text>
      </Text>
      <View style={styles.orderCountContainer}>
        <Text style={styles.orderCountText}>Du har lavet {idOrderCount} opslag!</Text>
        <Text style={styles.orderCountText}>Du har lavet {userwhoreservedOrderCount} reservationer!</Text>
        <Text style={styles.orderCountCO2}>Du har sparet {(idOrderCount + userwhoreservedOrderCount) * 1.25} KG CO2</Text>
      </View>
      <View style={styles.orderCountContainer}>
        <Text style = {styles.score}>Din gennemsnitlige score: 4.2</Text>
      </View>
      <View style={styles.nyhederContainer}>
          <Text style = {styles.nyhederHeader}>Nyheder</Text>
          <Text style = {styles.nyhederOverskrift}>Positive trend for madspild</Text>
          <Text style = {styles.nyheder}>Den gennemsnitlige dansker smider årligt mindre mad ud sammenlignet med for 10 år siden...</Text>
          <Text style = {styles.nyhederOverskrift}>Tips til at undgå madspild</Text>
          <Text style = {styles.nyheder}>Der er et stigende fokus på at nedsætte madspild hos danskerne. Nedenfor ser du 10 tips til at undgå madspild…</Text>
          <Text style = {styles.nyhederOverskrift}>Klimaforandringer hærger Sydeuropa</Text>
          <Text style = {styles.nyheder}>Det sydlige Europa bliver i disse dage påvirket voldsomt af massivt høje vanstande…</Text>
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
    marginTop: "5%",
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
    borderWidth: 1,
    width: 350
  },
  label: {
    fontSize: 18,
    color: '#333',
    fontWeight: "bold",
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
    marginTop: 10,
    textDecorationLine: "underline",
    marginBottom: 5
  },
  orderCountCO2:{
    fontSize: 20,
    fontWeight: "bold",
    color: "darkgreen",
    marginTop: 10,
    },
  nyhederContainer: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: "5%",
    padding: 15,
    borderRadius: 30,
    borderColor: "black",
    borderWidth: 1,
    width: 350

  },
  nyhederHeader: {
    fontSize: 18, 
    fontWeight: 'bold',
    marginBottom: 15
  },
  nyhederOverskrift: {
    fontSize: 15, 
    fontWeight: 'bold',
    marginBottom: 5
  },
  nyheder: {
    marginBottom: 15
  },
  score: {
    fontSize: 15,
    fontWeight: "bold",
    color: "darkgreen",
  }
})

// export af filen, så det kan bruges andre steder
export default Home 
