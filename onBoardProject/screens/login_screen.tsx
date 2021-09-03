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

type MyProps = {
  title: string;
  email: string;
  password: string;
};

function validateEmail(email: any) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function checkPwd(str: string) {
  if (str.length < 7) {
    return false;
  } else if (str.length > 50) {
    return false;
  } else if (str.search(/\d/) == -1) {
    return false;
  } else if (str.search(/[a-zA-Z]/) == -1) {
    return false;
  } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
    return false;
  }
  return true;
}

function pressed(email: any, password: string) {
  const validEmail = validateEmail(email);
  const validPassword = checkPwd(password);

  validEmail && validPassword
    ? console.log("Everything's fine")
    : Alert.alert('Invalid email or password');
}
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
        style={styles.button}
        onPress={() => pressed(email, password)}>
        <Text style={styles.buttonText}>Entrar</Text>
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
