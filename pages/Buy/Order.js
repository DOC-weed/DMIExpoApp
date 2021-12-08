import React,{useEffect} from 'react';
import { View ,ScrollView,Text,Button} from 'react-native';
import { db,auth } from '../../firebase';
import { ListItem } from 'react-native-elements';
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
               <ListItem key={index}>
                 <ListItem.Content>
                   <ListItem.Title>{data.Id}</ListItem.Title>
                   <ListItem.Subtitle>{data.date2}</ListItem.Subtitle>
                   <ListItem.Subtitle>Total: {data.total}</ListItem.Subtitle>
                   <ListItem.Subtitle>Status: {data.statuss}</ListItem.Subtitle>
                 </ListItem.Content>
                 
               </ListItem>
               
            )}
            
        </ScrollView>
      
    </View>
  )
}