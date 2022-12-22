import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../firebase"

function ChatUserOverview() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const [numUsers, setNumUsers] = useState(0);

  useEffect(() => {
    const userRef = 
    firebase
    .database()
    .ref('User');
    userRef.on('value', snapshot => {
      const users = snapshot.val();
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const chatRef = firebase.database().ref('Chats');
    chatRef.on('value', snapshot => {
      const numUsers = Object.values(snapshot.val());
      console.log(snapshot.val())
      setNumUsers(numUsers);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={Object.values(users)}  // Convert object to array
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.userItem}
            onPress={() =>
              navigation.navigate('DirectMessage', { uid: item.Id_ })
            }
          >
            <Text style={styles.fullName}>{item.homegroup.label}</Text>
            {/* Display numUsers here */}
            <Text>{`Antal brugere i chatten: ${numUsers}`}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.email}
      />
      
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'transparent',
      alignItems: 'center',
      flexDirection: "row",
      justifyContent: 'center',
    },
    userItem: {
      backgroundColor: '#f0f0f0',
      width: "75%",
      paddingTop: 10,
      marginTop: 20,
      marginHorizontal: 30,
      borderWidth: 1,
      borderRadius: 5,
    },
    fullName: {
      fontSize: 20,
    },
});
export default ChatUserOverview;