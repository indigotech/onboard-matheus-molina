import React from "react";
import { Button, View } from "react-native";
import {Navigation} from 'react-native-navigation';

interface AddUserButtonProps {
    componentId: string
}

export const AddUserButton: React.FC<any>= props =>{
    console.log(props);
    return(
        <View>
            <Button title='Add'
            onPress={props.onTap}/>
        </View>
    )
}