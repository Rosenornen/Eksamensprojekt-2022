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

  function handleDeleteChat() {
    // Check if the current user has sent any messages in the chat
    const hasSentMessage = Object.values(messages || {}).some(
      message => message.sender === auth.currentUser?.uid
    );
  
    if (hasSentMessage) {
      // The current user has sent a message in the chat, show the confirmation prompt
      Alert.alert(
        'Slet Chat',
        'Er du sikker på, at du vil slette chatten?',
        [
          { text: 'Fortryd', style: 'cancel' },
          { text: 'Slet', onPress: deleteChat },
        ],
        { cancelable: false },
      );
    } else {
      // The current user has not sent a message in the chat, show an error message
      alert("Du kan ikke slette chatten, da du ikke deltager i den");
    }
  }
  

  function deleteChat() {
    // Remove all messages from the Messages node in the Realtime Database
    messagesRef.remove();
  
    // Set the messages state variable to an empty array
    setMessages([]);
  
    // Remove the numUsers property from the Chats node in the Realtime Database
  }

  function handleSendMessage() {
      messagesRef.push({
        sender: auth.currentUser?.uid,
        message,
        timestamp: Date.now(),
        recipient: uid
      });
      setMessage('');
  }
  

  return (
    <LinearGradient
    colors={['#fce24e', 'white']}
    style={styles.LinearGradient}
    start={{ x: 1, y: 0 }}
    end={{ x: 1, y: 1 }}>
         <View style={styles.container}> 
       
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
        <Button
            title="Slet Chat"
            onPress={handleDeleteChat}
            style = {styles.sletButton}
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
    justifyContent: 'center',
    marginTop: 100,
  },
  message: {
    fontSize: 15,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    marginBottom: 20
  },
  fullName: {
    fontSize: 15,
    marginBottom: 30
  },
  sletButton: {
    marginBottom: 10
  }
});

export default DirectMessage;



