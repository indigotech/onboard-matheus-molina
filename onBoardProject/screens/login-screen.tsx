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

import {validateEmail, validatePassword} from '../features/validation';
import {LOGIN_MUTATION, storeAccesToken} from '../features/apollo-login';
import {useMutation} from '@apollo/client';

import {Navigation} from 'react-native-navigation';
import LoadingIcon from '../components/loading-icon';
import {
  ButtonText,
  Form,
  FormButton,
  H1,
} from '../components/components-styled';

interface LoginScreenProps {
  componentId: string;
  title: string;
}

export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {data, loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted: async data => {
      await storeAccesToken(data.login.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'HomePage',
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
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <Form
        label="Email"
        placeholder="name@domain.com"
        value={email}
        onChangeText={setEmail}
        onEndEditing={validateEmail}
      />
      <Form
        label="Password"
        placeholder="0000abcd"
        value={password}
        onChangeText={setPassword}
        onEndEditing={validatePassword}
      />

      <FormButton disabled={loading} onPress={loginPressed}>
        <ButtonText>
          {loading ? (
            <LoadingIcon
              size="small"
              color="#ffffff"
              isIconAnimating={loading}
            />
          ) : (
            'Entrar'
          )}
        </ButtonText>
      </FormButton>
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
});
