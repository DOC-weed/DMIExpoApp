import React, {useEffect} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text } from 'react-native';
import { db } from '../../firebase';
import { PayPalButton } from "react-paypal-button-v2";
import { requestOneTimePayment, requestBillingAgreement } from 'react-native-paypal'; 
export default function Checkot({route, navigation}){

    const {total,Id}= route.params;
    const [user, setUser]= React.useState({});
    useEffect(() => {
        getUser();
    }, [])
    const getUser= ()=>{
        db.ref('user').child(Id).get().then(res=>{
            setUser(res.val());
        }).catch(err=>{console.log(err)})
    }
    const pagar=async()=>{
      
    }


    return(
        <View>
            <TextInput editable={false}>{user.addres}</TextInput>
            <TextInput editable={false}>{user.country}</TextInput>
            <TextInput editable={false}>{user.email}</TextInput>
            <TextInput editable={false}>{user.name}</TextInput>
            <TextInput editable={false}>{user.phone}</TextInput>
            <Text>Total ${total}</Text>
            <Button title="Pagar" onPress={pagar}/>
            



        </View>
    )
}