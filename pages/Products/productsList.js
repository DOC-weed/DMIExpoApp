import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { db } from "../../firebase";

export default function ListProducts() {
    const [produts, setProducts] = React.useState({});
    const [user, setUser] = useState('00000000001');

    useEffect(()=> {
        __getProducts();
    }, [])

    const __getProducts = () => {
        db.ref(user + "/products").get().then((res) => {
            console.log(res);
            let objItem = res.val();
            console.log(objItem);
            if (objItem === null) {
              setProducts({});
            } else {
              setProducts(objItem);
            }
          }).catch((err) => {
            console.log(err);
      
          });
    }

    return (
        <View>
            <Text>Products list</Text>
            <ScrollView style={{ width: '100%', height: '500px'}}>
                {
                    Object.values(produts).map((i, index) => 
                        <Text key={index}>{i.name}</Text>
                    )
                }
            </ScrollView>
        </View>
    )
}