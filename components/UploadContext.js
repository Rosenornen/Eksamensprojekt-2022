import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { auth, db, firebase } from "../firebase"

function UploadContext() {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  function uploadData() {
    if (!text || !image) {
      // Display an error if the text or image is not set
      return;
    }

    // Write the data to the Firebase Realtime Database
    firebase.database().ref('/users/' + auth.currentUser?.uid).set({
      text,
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
        value={text}
        onChangeText={setText}
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
    width: '80%',
    height: 40,
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
