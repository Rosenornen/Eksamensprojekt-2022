
import {StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'
import { auth } from '../firebase';
import { db } from '../firebase';
import { LinearGradient } from 'expo-linear-gradient';

import ChatOverview from '../components/ChatFunction';
import ChatUserOverview from '../components/ChatUserOverview';

function Chat() {
    return (
      <LinearGradient
        colors={['#fce24e', 'white']}
        style={styles.LinearGradient}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}>
          <ChatUserOverview/>
      </LinearGradient>
    )
}
const styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default Chat



