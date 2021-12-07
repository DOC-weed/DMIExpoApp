import React, { useState,useEffect } from 'react';
import { Text } from 'react-native';
import { Image, SpeedDial } from 'react-native-elements';
import { auth, db } from '../../firebase';

import { StyledImageBanner,StyledImageProduct } from '../../StyledComponents/Images/images';
import { StyledTextStore } from '../../StyledComponents/Text/text';
import { StyledViewBanner, StyledViewStore,StyledViewStoreProducts,StyledViewStoreProductsCard } from '../../StyledComponents/Views/view';

export default function Tienda({ navigation }) {
  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [productsList, setproduct] =useState({});
  useEffect(() => {
    getProducts();
    getUser();
  }, [])
  const getProducts= async()=>{
    await db.ref().child('products').get().then(function(res){
      console.log('child_added');
      let json = res.val();
      let key;
      for (var field in json) {
        key = field;
        break;
    }
    setproduct(json[key]);
    console.log(json[key]);
      
    }).catch((err)=>{
      console.log(err);
    })
  }
  const getUser=()=>{
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
      <StyledImageBanner source={require ('../../assets/banner-offer.png')}/>
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
        {Object.values(productsList).map((data,index)=>
        <StyledViewStoreProductsCard key={index}>
        <Image style={{width:'100%'}} source={data.image}/>
        {console.log(data.image)}
          <StyledImageProduct source={{uri:data.image}}/>
          <StyledTextStore onPress={() => navigation.navigate('Detalles',{
            name:data.name,
            code: data.code,
            description:data.description,
            image: data.image,
            price: data.price,
            stock: data.stock
          })}>{data.name}</StyledTextStore>
        </StyledViewStoreProductsCard>
        
        ) }

      </StyledViewStoreProducts>




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
        onPress={() => navigation.navigate('CheckOut',)}
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
    </StyledViewStore>
    

  );
}