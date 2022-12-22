import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { auth, firebase } from "../firebase"
import { LinearGradient } from 'expo-linear-gradient';


function DirectMessage({}) {
  const route = useRoute();
  const { uid } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesRef = firebase.database().ref(`Messages/${uid}`);
  const [users, setUsers] = useState([]);
  const [numUsers, setNumUsers] = useState(0);
  const chatRef = firebase.database().ref(`Chats/${uid}`);



  useEffect(() => {
    messagesRef
    .on('value', snapshot => {
      let messages = snapshot.val();
      messagesRef
      .orderByChild('recipient')
      .equalTo(uid)
      .on('value', snapshot => {
        messages = {...messages, ...snapshot.val()};
        setMessages(messages);
      });
    });
  }, []);

  useEffect(() => {
    const userRef = firebase.database().ref('User');
    userRef.on('value', (snapshot) => {
      const users = snapshot.val();
      setUsers(users);
    });
  }, []);
  

  useEffect(() => {
    messagesRef.on('value', (snapshot) => {
      const messages = snapshot.val();
      setMessages(messages);
    });
  }, []);

  useEffect(() => {
    chatRef.on('value', snapshot => {
      const chat = snapshot.val();
      if (chat && chat.numUsers) {
        setNumUsers(chat.numUsers);
      } else {
        // If the chat node or the numUsers property does not exist, initialize them
        chatRef.set({ numUsers: 0 });
        setNumUsers(0);
      }
    });
  }, []);

  function handleDeleteChat() {
    Alert.alert(
      'Slet denne chat',
      'Er du sikker på, at du vil slette denne chat?',
      [
        { text: 'Fortryd', style: 'cancel' },
        { text: 'Slet', onPress: deleteChat },
      ],
      { cancelable: false },
    );
  }

  function deleteChat() {
    // Remove all messages from the Messages node in the Realtime Database
    messagesRef.remove();
  
    // Set the messages state variable to an empty array
    setMessages([]);
  
    // Remove the numUsers property from the Chats node in the Realtime Database
    chatRef.update({ numUsers: null });
  
    // Set the numUsers state variable to 0
    setNumUsers(0);
  }
  
  
  
  
  

  function handleSendMessage() {
    if (numUsers < 2) {
      // If the number of users in the chat is less than 2, proceed with sending the message
      messagesRef.push({
        sender: auth.currentUser?.uid,
        message,
        timestamp: Date.now(),
        recipient: uid
      });
      setMessage('');
  
      // Increment the number of users in the chat by 1
      chatRef.update({ numUsers: numUsers + 1 });
    } else {
      // If the number of users in the chat is 2 or more, show an error message or take other appropriate action
      alert("Chatten er fuld");
    }
  }
  

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
        <Button
            title="Delete chat"
            onPress={handleDeleteChat}
        />
        <View style={styles.container}>
        <Text style={styles.fullName}>Antal bruger i chatten: {numUsers}</Text>
    <FlatList
      data={Object.values(messages || {})}
      renderItem={({item }) => {
        if (item.sender) {
          const user = users[item.sender];
          return (
            <Text style={styles.message}>
              {user.fullName}: {item.message}
            </Text>
          );
        }
        return null;
      }}
      keyExtractor = {item => item.message}
    />

      <TextInput
        style={styles.input}
        value={message}
        placeholder="skriv noget her"
        onChangeText={setMessage}
        onSubmitEditing={handleSendMessage}
      />
    </View>
    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  },
  message: {
    fontSize: 15
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
  fullName: {
    fontSize: 15,
    marginBottom: 30
  }
});

export default DirectMessage;



