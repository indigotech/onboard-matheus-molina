import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Pressable,
} from 'react-native';

type MyProps = {
  title: string;
  email: string;
  password: string;
};

export const LoginScreen: React.FC<{
  title: string;
}> = ({title}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.loginView}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="name@domain.com"
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="0000abcd"
        onChangeText={val => setEmail(val)}
      />
      <Pressable style={styles.button} onPress={() => console.log('pressed')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>
      <Text> {password} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 10,
  },
  titleStyle: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 0.25,
    marginBottom: 60,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    marginVertical: 10,
    width: '100%',
    height: 50,
    borderRadius: 12,
  },
  button: {
    padding: 8,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5050ad',
    width: '100%',
    height: 50,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.25,
  },
});
