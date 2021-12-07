import React, {useEffect} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text } from 'react-native';
import { db } from '../../firebase';
import ReactDOM from "react-dom"


export default function Checkot({route, navigation}){

    const {total,Id}= route.params;
    const [user, setUser]= React.useState({});
    const [uid,setId] = React.useState('')
    const [tarjeta,settarjeta]=React.useState({
        number:"",
        name:"",
        expiration:"",
        ccv:""
    })
    useEffect(() => {
        getUser();
        setId(Id);
    }, [])
    const getUser= ()=>{
        db.ref('user').child(Id).get().then(res=>{
            setUser(res.val());
        }).catch(err=>{console.log(err)})
    }
    const pagar=()=>{
        if(tarjeta.number==""){
            Alert.alert("Oups","Ingrese Datos")
        }else{
            let date = new Date().toLocaleString();
            db.ref('order').child(Id).child(date).set({total:total, statuss:'complete',date2:date, Id:Id},).then(res=>{
                db.ref('cart').child(Id).remove().then(res=>{console.log(res)}).catch(err=>{console.log(err)})
                Alert.alert("Genial","Pedido realizado")
                navigation.navigate('Orders',{uid:uid});
            }).catch(err=>{
                console.log(err);
            })
            }
        }

   
    



    return(
        <View>
            <TextInput editable={false}>{user.addres}</TextInput>
            <TextInput editable={false}>{user.country}</TextInput>
            <TextInput editable={false}>{user.email}</TextInput>
            <TextInput editable={false}>{user.name}</TextInput>
            <TextInput editable={false}>{user.phone}</TextInput>
            <Text>Total ${total}</Text>
            <Text>Método de Pago</Text>
            <TextInput  placeholder="Numero de tarjeta" value={tarjeta.number} keyboardType="number-pad" onChangeText={settarjeta}></TextInput>
            <TextInput  placeholder="Nombre de tarjeta" value={tarjeta.name} keyboardType=""  onChangeText={settarjeta}></TextInput>
            <TextInput  placeholder="Mes/año" value={tarjeta.expiration}onChangeText={settarjeta}></TextInput>
            <TextInput  placeholder="ccv" value={tarjeta.ccv}  keyboardType="number-pad" onChangeText={settarjeta}></TextInput>
            
            <Button title="Pagar" onPress={pagar}/>

        
            



        </View>
    )
}