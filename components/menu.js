import React from 'react';
import { View ,StyleSheet,TouchableOpacity, Button} from 'react-native';
import { Text } from 'react-native-elements';
import { StyledButtonMenu } from '../StyledComponents/Text/text';
import { StyledViewIMenu } from '../StyledComponents/Views/view';


export default function Menu(props){
  

  
  return(
    <StyledViewIMenu>
      <StyledButtonMenu >About</StyledButtonMenu>
      <StyledButtonMenu >Services</StyledButtonMenu>
      <StyledButtonMenu >Clients</StyledButtonMenu>
      <StyledButtonMenu >Contact</StyledButtonMenu>
    </StyledViewIMenu>
  );
  
}