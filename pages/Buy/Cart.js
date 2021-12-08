import React, {useEffect} from 'react';
import { ScrollView, Text, View,Button,Alert, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { StyledImagesingleProduct } from '../../StyledComponents/Images/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyledContainerButtonCart, StyledContainerCart, StyledContainerInfoCart, StyledContainerTotal, StyledViewTitleText } from '../../StyledComponents/Views/view';
import { StyledButtonDeleteCart } from '../../StyledComponents/Buttons/buttons';
import { StyledTextItemCart, StyledTextTitle } from '../../StyledComponents/Text/text';


export default function Cart({navigation}){
    const [check,setcheck] =React.useState(false);
    const [cart,setCart] = React.useState({})
    const [total,settotal] = React.useState(0)
    const [iD,setId] = React.useState('')

    useEffect(() => {
        getCart();
    }, [])
    const getCart=async()=>{
        auth.onAuthStateChanged((user) => {
            if (user) {
              let uid = user.uid;
              setId(uid);
               db.ref().child('cart/'+uid).get().then(function(res){
                console.log('child_added');
                if(res.exists()){
                    let json = res.val();
                    setCart(json);
                    console.log(json);
                    let subtotal = 0;
                    Object.values(json).map(function(data){
                        subtotal+=(parseInt(data.cantidad)*parseInt(data.price))
                        //settotal((parseInt(data.cantidad)*parseInt(data.price)))
                    } )
                     settotal(subtotal)
                }else{
                    setCart({});
                    setcheck(true)
                    console.log('vacio');
                }
                
              }).catch((err)=>{
                console.log(err);
              })
            } else {
                Alert.alert('Oups','Inicia sesión para agregar poder agregar productos');
            }
          });
    }
    const deleteCart=()=>{
        Alert.alert(
            "¿Estás Seguro?",
            "¿Comfirmar borrar?",
            [
              {
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirmar", onPress: () => 
              db.ref('cart').child(iD).remove().then(res=>{
                  setcheck(true)
                  setCart({})
                  Alert.alert("Listo!","Carrito borrado")
              }).catch(err=>{
                  console.log(err);
              })
            }
            ]
          );
    }
    const goCheckOut=()=>{
        navigation.navigate('CheckOut',{total:total,Id:iD})
    }
    const deleteProduct = (id) =>{
      /*  Alert.alert(
            "¿Estás Seguro?",
            "Quitar producto?",
            [{
                text: "Cancelar",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "Confirmar", 
              onPress: () => 
              db.ref('cart').child(iD).child(id).remove().then(res=>{
                console.log(res)
                //getCart();
            }).catch(err=>{
                console.log(err);
            })
            }]
          );*/
       
    }
    return(
        <View>
            {(check)?<StyledViewTitleText><StyledTextTitle style={{color:'black'}}>Carrito vacio</StyledTextTitle></StyledViewTitleText>:null}

        <ScrollView style={{width:"100%"}}>
            {Object.values(cart).map((data,index)=>
                <StyledContainerCart  key={index}>
                    <StyledImagesingleProduct source={{uri:data.image}}/>
                    <StyledContainerInfoCart >
                        <StyledTextItemCart>Nombre:{data.name}</StyledTextItemCart>
                        <StyledTextItemCart>Cantidad:{data.cantidad}</StyledTextItemCart>
                        <StyledTextItemCart>Precio:${data.price}</StyledTextItemCart>
                        <StyledTextItemCart>Subtotal:{(parseInt(data.cantidad)*parseInt(data.price))}</StyledTextItemCart>
                    </StyledContainerInfoCart>
                    <StyledContainerButtonCart >
                        <StyledButtonDeleteCart onPress = {deleteProduct(data.code)}>
                            <Ionicons  name={'trash'} size= {28} color= {'red'} />  
                        </StyledButtonDeleteCart>
                    </StyledContainerButtonCart>
                </StyledContainerCart>
            )}
        </ScrollView>

        {(check)?null:<StyledContainerTotal><Text style={{color:'black', fontSize: 24}}>Total:{total}</Text></StyledContainerTotal>}
        {(check)?null:<Button style={{color:'black'}} color="red" onPress={deleteCart} title="Borrar Carrtio"/>}
        {(check)?null:<Button style={{color:'black'}}  onPress={goCheckOut} title="Finalizar Compra"/>}

        </View>
    )
}