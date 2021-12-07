import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyledListItem, StyledTestListItem } from "../../styles/styledComponents";
import { db } from "../../firebase";

export default function ListProducts({ navigation }) {
    const [produts, setProducts] = React.useState({});
    const [user, setUser] = useState('00000000001');

    useEffect(() => {
        __getProducts();
    }, [])

    const __getProducts = () => {

        db.ref('products/'+user ).get().then((res) => {
            console.log(res);
            let objItem = res.val();
            if (objItem === null) {
                setProducts({});
            } else {
                setProducts(objItem);
            }
        }).catch((err) => {
            console.log(err);

        });
    }

    const __edit = (code) => {
        navigation.navigate('Edit', { product: code })
    }

    return (
        <View>
            <Text>Products list</Text>
            <ScrollView style={{ width: '100%', height: '500px' }}>
                {
                    Object.values(produts).map((i, index) =>
                        <StyledListItem key={index}>
                            <StyledTestListItem >{i.code}</StyledTestListItem>
                            <StyledTestListItem >{i.name}</StyledTestListItem>
                            <TouchableOpacity onPress={() => __edit(i.code)}><Text>Editar</Text></TouchableOpacity>
                            <TouchableOpacity><Text>Eliminar</Text></TouchableOpacity>
                        </StyledListItem>
                    )
                }
            </ScrollView>
        </View>
    )
}