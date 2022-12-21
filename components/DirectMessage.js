import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { auth, firebase } from "../firebase"
import { LinearGradient } from 'expo-linear-gradient';


function DirectMessage({}) {
  const route = useRoute();
  const { uid } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesRef = firebase.database().ref(`Messages/${uid}}`);
  const [users, setUsers] = useState([]);


  useEffect(() => {
    messagesRef
    .orderByChild('sender')
    .equalTo(auth.currentUser?.uid)
    .on('value', snapshot => {
      let messages = snapshot.val();
      console.log(messages + " besked")
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
    const messageRef = 
    firebase
    .database()
    .ref('Messages');
    messageRef.on('value', snapshot => {
      const message = snapshot.val();
      setMessage(message);
    });
  }, []);

  function handleSendMessage() {
      messagesRef.push({
        sender: auth.currentUser?.uid,
        message,
        timestamp: Date.now()
      });
      console.log(message)
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
        data={Object.values(users)}  // Convert object to array
        renderItem={({ item }) => (
            <Text style={styles.fullName}>{"Du chatter nu med: " + item.fullName}</Text>
        )}
        keyExtractor={item => item.email}
      />
      <FlatList
        data={Object.values(messages || {})}
        // Convert object to array
        renderItem={({item }) => (
          <Text style={styles.message}>
            {item.message + " fra " + item.sender}
          </Text>
          
        )}
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
    fontSize: 15,

  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
  fullName: {
    fontSize: 15
  }
});

export default DirectMessage;



