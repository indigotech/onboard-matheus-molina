import React from "react";
import { Button, View } from "react-native";
import {Navigation} from 'react-native-navigation';

interface AddUserButtonProps {
    componentId: string
}

export const AddUserButton: React.FC<AddUserButtonProps>= props =>{
    return(
        <View>
            <Button title='Add'
            onPress={()=>{Navigation.push(props.componentId, {
                component: {
                  name: 'AddUserPage',
                  options: {
                    topBar: {
                      title: {
                        text: 'SignUp',
                      },
                    },
                  },
                },
              });}}/>
        </View>
    )
}