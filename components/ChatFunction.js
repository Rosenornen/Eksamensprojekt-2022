import React, { useState, useEffect } from 'react';
import {ScrollView, View, TextInput, Button, FlatList, StyleSheet, Text, RefreshControl} from 'react-native';
import { auth, db, firebase } from "../firebase"

    const ChatOverview = () => {
      const [messages, setMessages] = useState([]);
      const [newMessage, setNewMessage] = useState('');
      const [refreshing, setRefreshing] = useState(false);
      const [searchTerm, setSearchTerm] = useState('');
      const [searchResults, setSearchResults] = useState([]);

    
      // Fetch the messages from the Firebase Realtime database
      const fetchMessages = () => {
        firebase
          .database()
          .ref('messages')
          .on('value', (snapshot) => {
            const messageData = snapshot.val();
            if (messageData) {
          const messages = Object.keys(messageData).map((key) => {
            return {
              id: key,
              text: messageData[key].text,
            };
          });
          setMessages(messages);
          setRefreshing(false);
        }
      });
      firebase
      .database()
      .ref('messages')
      .on('child_removed', () => {
        setMessages([]);
      });
  };
    
      useEffect(() => {
        fetchMessages();
      }, []);
    
      // Send a new message to the Firebase Realtime database
      const sendMessage = () => {
        firebase
          .database()
          .ref('messages')
          .push({
            text: newMessage,
          });
        setNewMessage('');
      };
/*
      // Send a direct message to a user
  const sendDirectMessage = (userId) => {
    firebase
      .database()
      .ref(`messages/${userId}`)
      .push({
        text: newMessage,
      });
  };

    // Search for specific user
  const searchForUser = (email) => {
    firebase
      .database()
      .ref('users')
      .orderByChild('email')
      .equalTo(email)
      .on('value', (snapshot) => {
        const userData = snapshot.val();
        if (userData) {
          const userId = Object.keys(userData)[0];
          setSearchResults([{ id: userId, email }]);
        }
      });
  };
  */

      // Handle the refresh event
  const onRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  // Erase the chat history
  const eraseChatHistory = () => {
    firebase
      .database()
      .ref('messages')
      .remove();
  };
    
      return (
        <ScrollView style={styles.container}>
{/*DEN SOM SKAL SØGE EFTER BRUGERE TIL SIDST*/}
        <TextInput
        style={styles.input}
        placeholder="søg efter en bruger"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={() => searchForUser(searchTerm)}
      />
{/*DEN SOM SLETTER BESKEDERNE*/}
         <Button title="Erase Chat History" onPress={eraseChatHistory} />
           <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            onSubmitEditing={sendMessage}
          />
{/*DEN SOM VISER BESKEDERNE*/}
          <FlatList
            style={styles.list}
            data={messages}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item.text}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
      );
    };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          padding: 16,
          marginTop: "50%",
          backgroundColor: 'transparent',
        },
        list: {
          flex: 1,
        },
        listItem: {
          marginBottom: 16,
          padding: 8,
          backgroundColor: '#eee',
          borderRadius: 8,
        },
        input: {
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 16,
          padding: 8,
        },
      });
      
    
  export default ChatOverview;
