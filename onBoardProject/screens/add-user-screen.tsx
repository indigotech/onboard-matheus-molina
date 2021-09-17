import React, {useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import LoadingIcon from '../components/loading-icon';
import {
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
  validatePhoneNumber,
  validateRole,
} from '../features/validation';
import {Picker} from '@react-native-picker/picker';
import {useMutation} from '@apollo/client';
import {CREATE_USER_MUTATION} from '../features/apollo-add-user';
import {
  ButtonText,
  Form,
  FormButton,
  H1,
} from '../components/components-styled';

interface AddUserScreenComponent {
  componentId: string;
}

export const AddUserScreen: React.FC<AddUserScreenComponent> = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [createUser, {data, loading, error}] = useMutation(
    CREATE_USER_MUTATION,
    {
      onCompleted: () => {
        Navigation.pop(props.componentId);
      },
      onError: error => {
        Alert.alert(error.message);
      },
    },
  );
  function SignUpPressed() {
    const validEmail = validateEmail(email);
    const validphone = validatePhoneNumber(phone);
    const validBirthDate = validateDate(birthDate);
    const validPassword = validatePassword(password);
    const validRole = validateRole(role);
    if (
      validEmail &&
      validphone &&
      validBirthDate &&
      validPassword &&
      validRole
    ) {
      createUser({
        variables: {
          name: name,
          email: email,
          phone: phone,
          birthDate: birthDate,
          password: password,
          role: role,
        },
      });
    } else {
      Alert.alert('Wrong format on credentials, please check again');
    }
  }

  return (
    <View style={styles.loginView}>
      <ScrollView>
        <H1>Sign Up</H1>
        <Form
          label="Name"
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
          onEndEditing={validateName}
        />
        <Form
          label="Email"
          placeholder="name@domain.com"
          value={email}
          onChangeText={setEmail}
          onEndEditing={validateEmail}
        />
        <Form
          label="Phone"
          placeholder="XX XXXX XXXX"
          value={phone}
          onChangeText={setPhone}
          onEndEditing={validatePhoneNumber}
        />
        <Form
          label="Birth Date"
          placeholder="yyyy-mm-dd"
          value={birthDate}
          onChangeText={setBirthDate}
          onEndEditing={validateDate}
        />
        <Form
          label="Password"
          placeholder="0000abcd"
          value={password}
          onChangeText={setPassword}
          onEndEditing={validatePassword}
        />
        <Text style={styles.inputTitleStyle}>Role</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}>
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>
      </ScrollView>
      <FormButton disabled={loading} onPress={SignUpPressed}>
        <ButtonText>
          {loading ? (
            <LoadingIcon
              size="small"
              color="#fbfbfb"
              isIconAnimating={loading}
            />
          ) : (
            'Add User'
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

  inputTitleStyle: {
    color: '#777777',
    fontSize: 16,
    marginBottom: 12,
    marginTop: 6,
  },
});
