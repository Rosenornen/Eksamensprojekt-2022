import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db, firebase } from "../firebase"

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
            <Text style={styles.fullName}>{item.email + " / " + item.fullName + " / " + item.Id_
            }</Text>
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