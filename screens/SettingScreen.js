import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';

const SettingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Setting Screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060720',
  },
  text: {
    fontSize: 30,
    color: 'white',
    alignSelf: 'center',
  }
});
export default SettingScreen;