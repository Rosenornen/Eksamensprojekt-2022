// Import af diverse dependencies og componenter
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Button, Alert} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { auth, firebase } from "../firebase"
import { LinearGradient } from 'expo-linear-gradient';

// Funktion, der gør, at man kan skrive beskeder til hinanden i chatten 
function DirectMessage({}) {
// De forskellige attributter og referencer, der bruges til funktionen 
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

  // Funktion til at slette en chat, når man er færdig
  function handleDeleteChat() {
    // Checker om ens bruger har sendt en besked i chatten 
    const hasSentMessage = Object.values(messages || {}).some(
      message => message.sender === auth.currentUser?.uid
    );
    if (hasSentMessage) {
      // Hvis man har sendt en besked = får man muligheden for at kunne slette chatten
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
      // Hvis man ikke har sendt i besked = får man nedenstående alert 
      alert("Du kan ikke slette chatten, da du ikke deltager i den");
    }
  }
  

  function deleteChat() {
    // Sletter alle beskeder tilhørende chatten 
    messagesRef.remove();
  
    // Sætter Messages til et array
    setMessages([]);
  }

  // Funktion til at håndtere, når man vil sende en besked 
  function handleSendMessage() {
      messagesRef.push({
        sender: auth.currentUser?.uid,
        message,
        timestamp: Date.now(),
        recipient: uid
      });
      setMessage('');
  }
  
// Hvad man ser i sit View
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
        placeholder="Skriv noget her"
        onChangeText={setMessage}
        onSubmitEditing={handleSendMessage}
      />
    </View>
    </LinearGradient>

  );
}

// Style Sheet til View 
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
    marginBottom: 30
  },
  fullName: {
    fontSize: 15,
    marginBottom: 30
  },
  sletButton: {
    marginBottom: 10
  }
});


// export af filen, så det kan bruges andre steder
export default DirectMessage;
