import React from 'react';
import { View ,StyleSheet,TouchableOpacity, Button} from 'react-native';
import { Text } from 'react-native-elements';
import { StyledButtonMenu } from '../StyledComponents/Text/text';
import { StyledViewIMenu } from '../StyledComponents/Views/view';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';


export default function Menu({navigation}){

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  
  return(
    <StyledViewIMenu>
      <StyledButtonMenu onPress={(e)=>{ navigation.navigate("Login")}} >Login</StyledButtonMenu>
      <StyledButtonMenu >Registrate</StyledButtonMenu>
      <StyledButtonMenu >Carrito</StyledButtonMenu>
      <StyledButtonMenu >Ordenes</StyledButtonMenu>
      <StyledButtonMenu onPress={handleSignOut}>Salir</StyledButtonMenu>
    </StyledViewIMenu>
  );
  
}