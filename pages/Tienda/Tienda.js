import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { Image, SpeedDial } from 'react-native-elements';
import { auth, db } from '../../firebase';
import { useIsFocused } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';


import { StyledImageBanner, StyledImageProduct } from '../../StyledComponents/Images/images';
import { StyledTextStore } from '../../StyledComponents/Text/text';
import { StyledViewBanner, StyledViewStore, StyledViewStoreProducts, StyledViewStoreProductsCard } from '../../StyledComponents/Views/view';

import { Card } from 'react-native-elements'
import { StyledButtons, StyledButtonWatch } from '../../StyledComponents/Buttons/buttons';

export default function Tienda({ navigation }) {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [productsList, setproduct] = useState({});
  const [productsList2, setproduct2] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getProducts();
    getUser();
  }, [])

  useEffect(() => {
    getProducts();
}, [isFocused])
  
  const getProducts = async () => {
    await db.ref('productsgeneral/').get().then(function (res) {
      if (res.exists()) {
        let json = res.val();
        setproduct(json)
      } else {
        setproduct({})
      }

      //console.log('esto',json);
      //setproduct(json);


    }).catch((err) => {
      console.log(err);
    })

  }
  const getUser = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        let uid = user.uid;
        console.log(uid);
      } else {
      }
    });
  }



  return (
    <StyledViewStore>
      <StyledImageBanner source={require('../../assets/banner-offer.png')} />
      <StyledViewStoreProducts
        automaticallyAdjustContentInsets={false} // All of those are props
        contentInSet={{ bottom: 4 }}
        horizontal={false}
        alwaysBounceHorizontal={false}
        bounces={true}
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={200}
        pagingEnabled={true}
      >
        {Object.values(productsList).map((data, index) =>
          
          <StyledViewStoreProductsCard key={index}>
            <Card>
              <Card.Title>{data.name}</Card.Title>
              <Card.Divider/>
              
              <Card.Image style={{ width: '100%', height: 200 }} source={{uri:data.image}} />
              <StyledButtonWatch onPress={() => navigation.navigate('Detalles', {
                name: data.name,
                code: data.code,
                description: data.description,
                image: data.image,
                price: data.price,
                stock: data.stock
              })}>
                <Ionicons  name={'eye-outline'} size= {30} color= {'white'} />  
              </StyledButtonWatch>

            </Card>
          </StyledViewStoreProductsCard>

        )}

      </StyledViewStoreProducts>
    </StyledViewStore>


  );
}