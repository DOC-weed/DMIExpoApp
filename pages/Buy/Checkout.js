import React, {useEffect} from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text } from 'react-native';
import { db } from '../../firebase';
import ReactDOM from "react-dom"
import { StyledInput } from '../../StyledComponents/Inputs/inputs';
import { StyledContainerTotal, StyledViewInputs } from '../../StyledComponents/Views/view';
import { StyledTextButton, StyledTextTitle } from '../../StyledComponents/Text/text';
import { StyledButtons } from '../../StyledComponents/Buttons/buttons';


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
        <StyledViewInputs>
            <StyledInput editable={false}>{user.addres}</StyledInput>
            <StyledInput editable={false}>{user.country}</StyledInput>
            <StyledInput editable={false}>{user.email}</StyledInput>
            <StyledInput editable={false}>{user.name}</StyledInput>
            <StyledInput editable={false}>{user.phone}</StyledInput>
            <StyledContainerTotal>
                <Text style={{fontSize: 24, fontWeight: "bold"}}>Total ${total}</Text>
            </StyledContainerTotal>

            <StyledTextTitle>Método de Pago</StyledTextTitle>

            <StyledInput  placeholder="Numero de tarjeta" value={tarjeta.number} keyboardType="number-pad" onChangeText={settarjeta}/>
            <StyledInput  placeholder="Nombre de tarjeta" value={tarjeta.name} keyboardType=""  onChangeText={settarjeta}/>
            <StyledInput  placeholder="Mes/año" value={tarjeta.expiration}onChangeText={settarjeta}/>
            <StyledInput  placeholder="ccv" value={tarjeta.ccv}  keyboardType="number-pad" onChangeText={settarjeta}/>
            <Text style={{height: "5%"}}></Text>
            <StyledButtons onPress={pagar}>
                <StyledTextButton>Pagar</StyledTextButton>
            </StyledButtons>

        
            



        </StyledViewInputs>
    )
}