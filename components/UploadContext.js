import React, { useState } from 'react';
import { View, TextInput, Image, Button, StyleSheet, Alert, Text, Pressable } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { auth, firebase } from "../firebase"
import {Dropdown} from 'react-native-element-dropdown';

const data = [
  { label: 'Drikkevarer', value: '1' },
  { label: 'Kød', value: '2' },
  { label: 'Frugt & Grønt', value: '3' },
  { label: 'Fisk', value: '4' },
  { label: 'Fjerkræ', value: '5' },
  { label: 'Paste & Ris', value: '6' },
  { label: 'Færdigretter', value: '7' },
  { label: 'Konserves', value: '8' },
];

function UploadContext(navigation) {
    const [hvem, setHvem] = useState('');
    const [hvor, setHvor] = useState('');
    const [hvad, setHvad] = useState('');
    const [reserved, setReserved] = useState('');
    const [userwhoreserved, setUserWhoReserved] = useState('');
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
      const newDataRef = firebase
        .database()
        .ref(`MadTilAfhentning/`)
        .push({
          hvem,
          hvor,
          hvad,
          afhentningstidspunkt,
          madtype,
          image: downloadURL,
          Id_,
          reserved,
          userwhoreserved
        })

    const uniqueId = newDataRef.key;

    newDataRef.update({ id: uniqueId });


      Alert.alert(`Saved`);;
      navigation.navigate('BottomStack');
      setHvem('')
      setHvor('')
      setHvad('')
      setAfhentningstidspunkt('')
      setMadtype('')
      setImage(null)
      setUserWhoReserved('')
      setReserved('')
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
       <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={150}
        showsVerticalScrollIndicator="true"
        labelField="label"
        valueField="value"
        placeholder="Vælg madtype"
        searchPlaceholder="Søg..."
        value={data}
        onChange = {setMadtype}
      />
      <View style={styles.buttonsContainer}>
              <Pressable style={styles.UploadBillede} onPress={selectImage}><Text style={styles.UploadText}>Upload dit billede</Text></Pressable>

              <Pressable style={styles.UploadForm} onPress={uploadData}><Text style={styles.UploadText}>Send, tryk 1 gang</Text></Pressable>
      </View>

      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
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
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    marginBottom: -60,
    borderRadius: 10
  },
  header: {
    fontSize: 40,
    padding: 10
  },
  info: {
    fontSize: 20,
    padding: 5
  },
  buttonsContainer:{
    flexDirection: "row",
    alignItems: "center"
  },
  UploadForm:{
    backgroundColor: "lightgreen",
    borderRadius: 3,
    padding: 10
  },
  UploadBillede:{
    backgroundColor: "orange",
    borderRadius: 3,
    marginRight: 10,
    padding: 10
  },
  UploadText:{
    fontWeight: "bold"
  },
  dropdown: {
    margin: 15,
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 1,
  },
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
  inputSearchStyle: {
    height: 30,
    fontSize: 12,
    borderRadius: 4,
  },
});

export default UploadContext;
