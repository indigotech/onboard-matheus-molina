import styled from 'styled-components/native';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {validateEmail, validatePassword} from '../features/validation';

export const H1 = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const FormButton = styled.TouchableOpacity`
  background-color: #5050ad;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 12px;
  margin-bottom: 26px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-weight: normal;
  color: #ffffff;
`;

interface FormItemProps{
    pageOk: boolean;
}

interface FormProps {
  onChangeText: (value:string) => void;
  value: string;
  placeholder: string;
  onEndEditing: (value:string) => boolean;
  label: string
}

const InputLabel = styled.Text<FormItemProps>`
  font-size: 16px;
  color: ${props => (props.pageOk ? '#777777' : '#bf2225')};
  margin-bottom: 12px;
  margin-top: 6px;
`;

const FormInput = styled.TextInput<FormItemProps>`
  border-width: 1px;
  border-color: ${props => (props.pageOk ? '#777777' : '#bf2225')};
  width: 100%;
  border-radius: 12px;
  height: 50px;
  padding: 8px;
`;

const Caption = styled.Text`
  font-size: 12px;
  color: #bf2225;
  margin-top: 8px;
`;


export const Form: React.FC<FormProps> = props => {
  const [pageOk, setPageOk] = useState(true);
  return (
    <View>
      <InputLabel pageOk={pageOk}>{props.label}</InputLabel>
      <FormInput
        pageOk={pageOk}
        autoCapitalize="none"
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        onEndEditing={() => {
          setPageOk(props.onEndEditing(props.value));
        }}
      />
      <Caption>{pageOk ? '' : 'Wrong Input Format'}</Caption>
    </View>
  );
};
