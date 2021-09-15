import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAccesToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {}
};

export const LOGIN_MUTATION = gql`
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
