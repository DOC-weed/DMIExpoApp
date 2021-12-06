import React, { useState } from 'react';
import { Text } from 'react-native';
import { SpeedDial } from 'react-native-elements';

export default function Tienda({ navigation }) {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  return (
    <SpeedDial
      isOpen={openAdd}
      icon={{ name: 'menu', color: '#fff' }}
      openIcon={{ name: 'close', color: '#fff' }}
      onOpen={() => setOpenAdd(!openAdd)}
      overlayColor={"none"}
      onClose={() => setOpenAdd(!openAdd)}
    >
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Check"
        onPress={() => navigation.navigate('CheckOut')}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="OneProduct"
        onPress={() => navigation.navigate('OneProduct')}
      />
      <SpeedDial.Action
        icon={{ name: 'add', color: '#fff' }}
        title="Cart"
        onPress={() => navigation.navigate('Cart')}
      />
    </SpeedDial>
  );
}