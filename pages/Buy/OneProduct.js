import React,{useEffect} from 'react';
import { Text,Button,Alert, View } from 'react-native';
import { db,auth } from '../../firebase';
import { StyledButtonNoneColor, StyledButtons } from '../../StyledComponents/Buttons/buttons';
import { StyledImageProduct2 } from '../../StyledComponents/Images/images';
import { StyledInputNumber } from '../../StyledComponents/Inputs/inputs';
import { StyledTextButton, StyledTextButtonColor, StyledTextStore } from '../../StyledComponents/Text/text';
import { StyledViewStore2, StyledViewTextDetails } from '../../StyledComponents/Views/view';


export default function SingleProduct({ route, navigation }){
    const [cantidad, setcantidad]= React.useState(0);
    const {name,description,image,price,code,stock} = route.params;


    useEffect(() => {

        if(cantidad > stock){
            setcantidad(stock);
        }
    }, [])
    const goToCart =()=>{
            navigation.navigate('Cart')
    }
    const addToCart =()=>{
     auth.onAuthStateChanged((user) => {
            if (user) {
              let uid = user.uid;
              if(cantidad===0){
               Alert.alert('Ohh','Ingrese una Cantidad');
            }else{
                 db.ref('cart').child(uid).child(code).set({
                    name:name,
                    description:description,
                    image:image,
                    price:price,
                    code:code,
                    cantidad:cantidad
                }).then(res=>{
                    Alert.alert('Perfecto','producto agregado');
                    setcantidad(0);
                }).catch(err=>{
                    console.log(err);
                })
            }
            } else {
                Alert.alert('Oups','Inicia sesión para agregar poder agregar productos');
            }
          });
        
    }
    return(
        <StyledViewStore2>
            <StyledImageProduct2 source={{uri:image}}/>
            <StyledViewTextDetails>
                <StyledTextStore>Nombre:{name}</StyledTextStore>
                <StyledTextStore>Descripción:{description}</StyledTextStore>
                <StyledTextStore>Pecio: ${price}</StyledTextStore>
            </StyledViewTextDetails>

            <StyledInputNumber placeholder={'Disponibles '+stock} keyboardType="numeric" value={cantidad} onChangeText={setcantidad} />

            <StyledButtons onPress={addToCart}>
                <StyledTextButton>Agregar al carrito</StyledTextButton>
            </StyledButtons>
            <StyledButtonNoneColor  onPress={goToCart}>
                <StyledTextButtonColor>Ir al carrito</StyledTextButtonColor>
            </StyledButtonNoneColor>
        </StyledViewStore2>
    )
}