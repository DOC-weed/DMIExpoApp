import React,{useEffect} from 'react';
import { View ,ScrollView,Text,Button} from 'react-native';
import { db,auth } from '../../firebase';

export default function Order({navigation, route}){
  const user = auth.currentUser.uid;

const [orders,setorder] =React.useState({})
const [check,setcheck] = React.useState(false)

useEffect(() => {
  getOrder()
}, [])
const getOrder=()=>{
  db.ref('order').child(user).get().then(res=>{
    if(res.exists()){
      setorder(res.val())
      console.log(res.val());
    }else{
      setorder({})
      setcheck(true)
    }

  }).catch(err=>{
    console.log(err);
  })
}

  return(
    <View>
      {(check)?<Text>No hay Ordenes</Text>:null}
      <ScrollView style={{width:'100%'}}>
            {Object.values(orders).map((data,index)=>
                <View style={{display:'flex',width:'100%',flexDirection:"row",padding:20,alignContent:'center'}} key={index}>
                    <Text >ID: {data.Id}</Text>
                    <Text >Total: ${data.total}</Text>
                    <Text >Fecha{data.date2}</Text>
                    <Text >Estatus:{data.statuss}</Text>
                    <View style={{display:'flex'}}>

                    </View>
                   

                </View>
            )}
            
        </ScrollView>
      
    </View>
  )
}