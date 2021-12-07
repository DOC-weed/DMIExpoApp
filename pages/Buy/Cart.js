import React, {useEffect} from 'react';
import { ScrollView, Text, View,Button,Alert } from 'react-native';
import { Image } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { StyledImagesingleProduct } from '../../StyledComponents/Images/images';


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
            {(check)?<Text style={{color:'black'}}>Carrito vacio</Text>:null}

        <ScrollView style={{width:'100%'}}>
            {Object.values(cart).map((data,index)=>
                <View style={{display:'flex',width:'100%',flexDirection:"row",padding:20,alignContent:'center'}} key={index}>
                    <StyledImagesingleProduct source={{uri:data.image}}/>
                    <View style={{display:'flex'}}>
                    <Text>Nombre:{data.name}</Text>
                    <Text>Cantidad:{data.cantidad}</Text>
                    <Text>Precio:${data.price}</Text>
                    <Text>Subtotal:{(parseInt(data.cantidad)*parseInt(data.price))}</Text>
                    </View>
                    <Button style={{color:'black'}} color="red" onPress={deleteProduct(data.code)} title="Quitar"/>
                   

                </View>
            )}
            
        </ScrollView>

        {(check)?null:<Text style={{color:'black'}}>Total:{total}</Text>}
        {(check)?null:<Button style={{color:'black'}} color="red" onPress={deleteCart} title="Borrar Carrtio"/>}
        {(check)?null:<Button style={{color:'black'}}  onPress={goCheckOut} title="Finalizar Compra"/>}

        </View>
    )
}