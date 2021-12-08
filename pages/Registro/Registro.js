import React, {useState,useEffect} from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from "../../firebase";


import { StyledButtonNoneColor, StyledButtons } from '../../StyledComponents/Buttons/buttons';
import { StyledInput, StyledInputInLine, StyledInputInLineLeft, StyledInputInLineRight } from '../../StyledComponents/Inputs/inputs';
import { StyledTextButton, StyledTextButtonColor } from '../../StyledComponents/Text/text';
import { StyledView, StyledViewInLineInputs } from '../../StyledComponents/Views/view';




export default function Registro() {
  const navigation = useNavigation();
  const[name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [addres, setAddres] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");

  
  
  useEffect(()=> {
    const unsuscribe = auth.onAuthStateChanged((user)=>{
      if(user){
        navigation.replace("Tabs");
      }
    });
    return unsuscribe;
  },[]);

  const handleSinUp = () =>{
    auth.createUserWithEmailAndPassword(email ,pwd).then((userCredentials) => {
      const user = userCredentials.user;
      console.log(user);
      db.ref('user').child(user.uid).set({
        name: name,
        email: user.email,
        addres: addres,
        country: country,
        phone: phone
      });
    })
    .catch((error) =>{
      alert(error.message);
    })
  }
  return(
    <StyledView>
      <StyledInput
        placeholder = "Nombre"
        value = {name}
        onChangeText = {(text) => setName(text)}
      />
      <StyledInput
        placeholder = "Correo"
        value = {email}
        onChangeText = {(text) => setEmail(text) }
      />
      <StyledInput
        placeholder = "Direccion"
        value = {addres}
        onChangeText = {(text) => setAddres(text)}
      />
      <StyledInput
        placeholder = "Pais"
        value = {country}
        onChangeText = {(text) => setCountry(text)}
      />
      <StyledInput
        placeholder = "Numero de Telefono"
        value = {phone}
        onChangeText = {(text) => setPhone(text)}
      />
      <StyledInput
        placeholder = "Contraseña"
        value = {pwd}
        onChangeText = {(text) => setPwd(text)}
        secureTextEntry
      />
        <View style={{height: "2%"}}></View>

      <StyledButtons onPress ={ handleSinUp}>
        <StyledTextButton>Crear cuenta</StyledTextButton>
      </StyledButtons>
      <StyledButtonNoneColor onPress={() => navigation.replace('Login')}>
        <StyledTextButtonColor>Back to Login</StyledTextButtonColor>
      </StyledButtonNoneColor>
    </StyledView>
  );
}