import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db, firebase } from "../firebase"
import { LinearGradient } from 'expo-linear-gradient';

function DirectChat({}) {
    const { uid } = route.params;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  console.log(navigation +" direktechat")
  const messagesRef = firebase.database().ref(`Messages/${uid}}`);

  useEffect(() => {
    messagesRef.orderByChild('sender').equalTo(auth.currentUser?.uid).on('value', snapshot => {
      let messages = snapshot.val();
      console.log(messages)
      messagesRef.orderByChild('recipient').equalTo(auth.currentUser?.uid).on('value', snapshot => {
        messages = {...messages, ...snapshot.val()};
        setMessages(messages);
      });
    });
  }, []);

  function handleSendMessage() {
    messagesRef.push({
      sender: auth.currentUser?.uid,
      message,
      timestamp: Date.now(),
      recipient: uid,
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
        data={Object.values(messages?.items || {})}
        // Convert object to array
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
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 10,
  },
});

export default DirectChat;



