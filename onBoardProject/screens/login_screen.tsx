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
  Alert,
  TouchableOpacity,
} from 'react-native';

import {gql, useMutation} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';

const LOGGED_IN = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      token
      user {
        name
        id
        phone
        birthDate
        email
        role
      }
    }
  }
`;

function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
}

function validatePassword(password: string) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return re.test(password);
}

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
      // value previously stored
    }
  } catch (e) {
    // error reading value
  }
};

export const LoginScreen: React.FC<{
  title: string;
}> = ({title}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {data, loading, error}] = useMutation(LOGGED_IN, {
    onCompleted: data => storeData(data.login.token),
  });

  async function loginPressed() {
    const validEmail = validateEmail(email);
    const validPassword = validatePassword(password);

    if (validEmail && validPassword) {
      await login({variables: {email: email, password: password}});
    } else {
      Alert.alert('Invalid email or password');
    }
  }

  return (
    <View style={styles.loginView}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text>Email</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="name@domain.com"
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        autoCapitalize="none"
        style={styles.input}
        placeholder="0000abcd"
        onChangeText={val => setPassword(val)}
      />
      <TouchableOpacity
        disabled={loading}
        style={styles.button}
        onPress={loginPressed}>
        <Text style={styles.buttonText}>
          {loading ? 'Carregando' : 'Entrar'}
        </Text>
      </TouchableOpacity>
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
