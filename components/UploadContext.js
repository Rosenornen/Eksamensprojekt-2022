import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { auth, db, firebase } from "../firebase"

function UploadContext() {
    const [hvem, setHvem] = useState('');
    const [hvor, setHvor] = useState('');
    const [hvad, setHvad] = useState('');
    const [afhentningstidspunkt, setAfhentningstidspunkt] = useState('');
    const [madtype, setMadtype] = useState('');
    const [image, setImage] = useState(null);

  function uploadData() {
    if (!hvem || !hvor || !hvad || !afhentningstidspunkt || !madtype || !image ) {
      // Display an error if the text or image is not set
      return;
    }

    // Write the data to the Firebase Realtime Database
    firebase.database().ref('/users/' + auth.currentUser?.uid).set({
    hvem,
    hvor,
    hvad,
    afhentningstidspunkt,
    madtype,
    image
    });
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
    width: 100,
    height: 25,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10
  },
  image: {
    width: 200,
    height: 200,
    margin: 10
  }
});

export default UploadContext;
