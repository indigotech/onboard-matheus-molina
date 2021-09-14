import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import LoadingIcon from '../components/loading-icon';
import { validateDate, validatePhoneNumber, validateRole } from '../features/validation';

export const AddUserScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  function SignUpPressed(){}

  const loading = false;
  return (
    <View style={styles.loginView}>
      <ScrollView>
        <Text style={styles.titleStyle}>Sign Up</Text>
        <Text style={styles.inputTitleStyle}>Name</Text>
        <TextInput
          autoCapitalize="words"
          style={styles.input}
          placeholder="Your Name"
          onChangeText={setName}
        />
        <Text style={styles.inputTitleStyle}>Email</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="name@domain.com"
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.inputTitleStyle}>Phone</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="(XX) XXXX-XXXX"
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Text style={styles.inputTitleStyle}>Birth Date</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="yyyy-mm-dd"
          onChangeText={setBirthDate}
          keyboardType="numeric"
        />
        <Text style={styles.inputTitleStyle}>Password</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="0000abcd"
          onChangeText={setPassword}
        />
        <Text style={styles.inputTitleStyle}>Role</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.input}
          placeholder="i.e. admin or user"
          onChangeText={value => setRole(value.toLowerCase())}
        />
        <TouchableOpacity
          disabled={loading}
          style={styles.button}
          onPress={()=>{}}>
          <Text style={styles.buttonText}>
            {loading ? <LoadingIcon isIconAnimating={loading} /> : 'Add User'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
  inputTitleStyle: {
    fontWeight: '700',
    color: '#000000',
    fontSize: 18,
  },
  pickerStyle: {
    backgroundColor: '#fbfbfb',
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
