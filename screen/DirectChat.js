import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, firebase } from "../firebase"
import ChatUserOverview from '../components/ChatUserOverview';

function DirectChat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const fullName = navigation.getParam('fullName');
  const messagesRef = firebase.
  database()
  .ref(`messages/${fullName}`);

  useEffect(() => {
    messagesRef.on('value', snapshot => {
      const messages = snapshot.val();
      console.log(messages)
      setMessages(messages);
    });
  }, []);

  function handleSendMessage() {
    messagesRef.push({
      sender: 'me',
      message,
      timestamp: Date.now(),
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
        data={Object.values(messages)}  // Convert object to array
        renderItem={({ item }) => (
          <Text style={styles.message}>
            {item.sender}: {item.message}
          </Text>
        )}
      />
      <TextInput
        style={styles.input}
        value={message}
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
  },
});

export default DirectChat;




