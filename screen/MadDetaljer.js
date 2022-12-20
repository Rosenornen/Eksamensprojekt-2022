import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db, firebase } from "../firebase"

function DisplayContext() {
  const [hvem, setHvem] = useState('');
  const [hvor, setHvor] = useState('');
  const [hvad, setHvad] = useState('');
  const [afhentningstidspunkt, setAfhentningstidspunkt] = useState('');
  const [madtype, setMadtype] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Fetch the data for the current user
    firebase.database().ref('/MadTilAfhentning/' + auth.currentUser?.uid).once('value', snapshot => {
      const data = snapshot.val();

      // Set the state with the fetched data
      setHvem(data.hvem);
      setHvor(data.hvor);
      setHvad(data.hvad);
      setAfhentningstidspunkt(data.afhentningstidspunkt);
      setMadtype(data.madtype);
      setImage(data.image);
    });
  }

  return (
    <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.container}>
      <Text>Hvem: {hvem}</Text>
      <Text>Hvor: {hvor}</Text>
      <Text>Hvad: {hvad}</Text>
      <Text>Afhentningstidspunkt: {afhentningstidspunkt}</Text>
      <Text>Madtype: {madtype}</Text>
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
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

export default DisplayContext;