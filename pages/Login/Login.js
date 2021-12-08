import React from "react";
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {auth} from "../../firebase";

import { StyledView } from '../../StyledComponents/Views/view';
import { StyledInput } from '../../StyledComponents/Inputs/inputs';
import { StyledButtons, StyledButtonNoneColor } from "../../StyledComponents/Buttons/buttons";
import { StyledTextButton, StyledTextButtonColor } from "../../StyledComponents/Text/text";
import { StyledImageLogo } from "../../StyledComponents/Images/images";

export default function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Tabs");
      }
    });
    return unsuscribe;
  }, []);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, pwd)
      .then((userCredentials) => {
        // then is a fullfilled promise
        const user = userCredentials.user;
        console.log("Logged in with:", user);
      })
      .catch((error) => {
        // catch is a rejected promise
        alert(error.message);
      });
  };

  return(
    <StyledView>
      <StyledImageLogo source = {require ("../../assets/comercial.png") } />
      <StyledInput
        placeholder = "Correo"
        value = {email}
        onChangeText = {(text) => setEmail(text)}
      />
      <StyledInput
        placeholder = "Contraseña"
        value = {pwd}
        onChangeText = {(text) => setPwd(text)}
        secureTextEntry/>
        <View style={{height: "2%"}}></View>
      <StyledButtons onPress = {handleLogin}>
        <StyledTextButton>Iniciar Sesion</StyledTextButton>
      </StyledButtons>
      <StyledButtonNoneColor onPress = {() => navigation.replace('Singup')}>
        <StyledTextButtonColor>Crear Cuenta</StyledTextButtonColor>
      </StyledButtonNoneColor>
    </StyledView>
  );
}