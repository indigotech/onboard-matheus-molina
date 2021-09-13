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

import {validateEmail, validatePassword} from '../features/validation'
import { storeData } from '../features/apollo_management';

import {gql, useMutation} from '@apollo/client';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation} from 'react-native-navigation';
import LoadingIcon from '../components/loading_icon';

const LOGIN_MUTATION = gql`
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





interface LoginScreenProps {
  componentId: string;
  title: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {data, loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted: async data => {
      await storeData(data.login.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'HomePage',
          options: {
            topBar: {
              title: {
                text: 'Home',
              },
            },
          },
        },
      });
    },
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
      <Text style={styles.titleStyle}>{props.title}</Text>
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
          {loading ? <LoadingIcon isIconAnimating={loading} /> : 'Entrar'}
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
