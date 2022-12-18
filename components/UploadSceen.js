import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import React, { useState, } from 'react';
import * as ImagePicker from "expo-image-picker";
import { auth, db, firebase } from "../firebase"

const UploadScreen = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  /*const [imagesArr, setImagesArr] = useState([]);*/

  const pickImage = async () => {
    // Ingen tilladelse er nødvendigt for at bruge billede galleriet
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const source = { uri: result.uri };
    console.log(source);
    setImage(source);

};

const uploadImage = async () => {
  setUploading(true);
  const response = await fetch(image.uri)
  const blob = await response.blob();
  const filename = image.uri.substring(image.uri.lastIndexOf('/') + 1);
  var ref = firebase.storage().ref().child(filename).put(blob);

  try {
    await ref;
  } catch (e) {
    console.error(e);
  }
  setUploading(false);
    Alert.alert(
      'Billede blev uploadet'
    );
    setImage(null);
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
          <Text style={styles.buttonText}> Vælg et billede</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
            {image && <Image source={{uri: image.uri}} style={{width: 150, height: 150}}/>}
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
              <Text style={styles.buttonText}>Upload dit billede</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default UploadScreen


const styles = StyleSheet.create({
  container:{ 
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectButton:{
    borderRadius:10,
    width: 100,
    height: 50,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  uploadButton:{
    borderRadius:10,
    width: 100,
    height: 50,
    marginTop: 30,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText:{
    color: "white",
    fontSize: 18,
    fontWeight: "bold"
  },
  imageContainer:{
    marginTop: 30,
    marginBottom: 50,
    alignItems: "center"
  },
})


