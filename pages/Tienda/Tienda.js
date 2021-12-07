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
  const [productsList, setproduct] =useState([]);
  const [productsList2, setproduct2] =useState([]);
  useEffect(() => {
    getProducts();
    getUser();
    maps();

  }, [])
  const getProducts= async()=>{
    await db.ref().child('products').get().then(function(res){
      console.log('child_added');
      let json = res.val();
      let arr =[];
      console.log('arrJson',Object.keys(json));
      Object.values(json).map(function(data,IdIndex){
        arr[IdIndex]=data
      Object.values(data).map(function(datos,IndexInterno){
        console.log('map 2/key',datos)

      })

    })
    setproduct(arr)
      //console.log('esto',json);
      //setproduct(json);

      
    }).catch((err)=>{
      console.log(err);
    })
    maps();
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
  const maps=()=>{
    let container=[];
    productsList.map((data,index)=>{
      console.log(data,index)
      if(Object.keys(data).length>1){
        Object.values(data).map((datos,index2)=>{
          console.log(datos,index2);
          container.push(datos)
        })
      }
      container.push(data)
      console.log(Object.keys(data).length);
    })
    console.log(container);
    setproduct2(container)
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
        {productsList2.map((data,index)=>
        <StyledViewStoreProductsCard key={index}>
        <Image style={{width:'100%'}} source={data.image}/>

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
    </StyledViewStore>
    

  );
}