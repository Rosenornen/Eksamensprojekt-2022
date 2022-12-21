import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, Alert, Text } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { auth, db, firebase } from "../firebase"

function UploadContext() {
    const [hvem, setHvem] = useState('');
    const [hvor, setHvor] = useState('');
    const [hvad, setHvad] = useState('');
    const [afhentningstidspunkt, setAfhentningstidspunkt] = useState('');
    const [madtype, setMadtype] = useState('');
    const [image, setImage] = useState(null);
    const Id_ = auth.currentUser?.uid

    async function uploadData() {
      if (!hvem || !hvor || !hvad || !afhentningstidspunkt || !madtype || !image ) {
        // Display an error if the text or image is not set
        return Alert.alert('Alle Felter skal udfyldes')
      }
  
      // Create a storage reference
      const storageRef = firebase.storage().ref();
  
      // Create a reference to the file in Cloud Storage
      const fileRef = storageRef.child(`images/${image}`);
  
      // Retrieve the image data
      const response = await fetch(image);
      const data = await response.blob();
  
      // Upload the file to Cloud Storage
      await fileRef.put(data);
  
      // Get the download URL for the file
      const downloadURL = await fileRef.getDownloadURL();
  
      // Write the data to the Firebase Realtime Database
      firebase
        .database()
        .ref('/MadTilAfhentning/')
        .push({
          hvem,
          hvor,
          hvad,
          afhentningstidspunkt,
          madtype,
          image: downloadURL,
          Id_
        })
      Alert.alert(`Saved`);;
      setHvem('')
      setHvor('')
      setHvad('')
      setAfhentningstidspunkt('')
      setMadtype('')
      setImage(null)
    }
  

  async function selectImage() {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
  
    try {
      const response = await ImagePicker.launchImageLibraryAsync(options);
      if (response.cancelled) {
        console.log('User cancelled image picker');
      } else {
        // Set the image state with the selected image
        setImage(response.uri);
      }
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    }
  }

  return (
  
   <View style={styles.container}>
      <Text style = {styles.header}>Giv mad</Text>
      <Text style = {styles.info}>Udfyld felterne nedenfor</Text>
      <TextInput
        style={styles.input}
        value={hvem}
        placeholder="Hvem"
        onChangeText={setHvem}
      />
      <TextInput
        style={styles.input}
        value={hvor}
        placeholder="Hvor"
        onChangeText={setHvor}
      />
      <TextInput
        style={styles.input}
        value={hvad}
        placeholder="Hvad"
        onChangeText={setHvad}
      />
      <TextInput
        style={styles.input}
        value={afhentningstidspunkt}
        placeholder="Hvornår"
        onChangeText={setAfhentningstidspunkt}
      />
      <TextInput
        style={styles.input}
        value={madtype}
        placeholder="Madtype"
        onChangeText={setMadtype}
      />
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      <Button title="Upload" onPress={uploadData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: 225,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    margin: 10
  },
  header: {
    fontSize: 40,
    padding: 10
  },
  info: {
    fontSize: 20,
    padding: 5
  }
});

export default UploadContext;
