import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from "../firebase"

function ChatUserOverview() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

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


  return (
    <View>
      <View style = {styles.textContainer}>
            <Text style = {styles.chatHeader}>Chat</Text>
            <Text style = {styles.chatText}>Vælg en chat tilhørende dit boligområde (Max pr. chat: 2)</Text>
      </View>
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
          </TouchableOpacity>
        )}
        keyExtractor={item => item.email}
      />
     </View>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      flexDirection: "row",
      alignItems: 'center',
      width: 400
    },
    textContainer: {
      marginBottom: "10%",
      backgroundColor: 'transparent',
      alignItems: 'center',
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
    chatHeader: {
      fontSize: 30
    },
    chatText: {
      marginTop: 10,
    }
});
export default ChatUserOverview;