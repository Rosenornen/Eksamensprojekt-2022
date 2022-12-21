import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db, firebase } from "../firebase"
import {Dropdown} from 'react-native-element-dropdown';

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
      console.log(data)

     // Set the state with the fetched data, if data is not null
     if (data) {
        setHvem(data.hvem);
        setHvor(data.hvor);
        setHvad(data.hvad);
        setAfhentningstidspunkt(data.afhentningstidspunkt);
        setMadtype(data.madtype);
        setImage(data.image);
      }
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
      <Dropdown
        data={[
          { value: hvad },
        ]}
        value={hvad}
        renderRow={(rowData) => (
          <View style={styles.rowContainer}>
            {image && (
              <Image source={{ uri: image }} style={styles.image} />
            )}
            <Text style={styles.rowText}>{rowData.value}</Text>
            <Text style={styles.rowText}>{afhentningstidspunkt}</Text>
          </View>
        )}
        onChangeText={(value) => setHvad(value)}
      />
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
