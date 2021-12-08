import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyledListItem, StyledTestListItem } from "../../styles/styledComponents";
import { db, auth } from "../../firebase";
import { useIsFocused } from "@react-navigation/native";
import { StyledViewTitleText } from "../../StyledComponents/Views/view";
import { StyledTextTitle } from "../../StyledComponents/Text/text";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function ListProducts({ navigation }) {
    const [produts, setProducts] = React.useState({});
    const user = auth.currentUser.uid;
    const isFocused = useIsFocused();

    useEffect(() => {
        __getProducts();
    }, [isFocused])

    useEffect(() => {
        __getProducts();
    }, [])

    const __getProducts = () => {

        db.ref('products/' + user).get().then((res) => {
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

    const __produtoDelete = (code) => {
        db.ref("products/" + user).child(code).remove().then(async (res) => {
            db.ref('productsgeneral/').child(code).remove().then((res) => {
                alert("Product deleted");
                __getProducts();
            }).catch(err => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err);

        });
    }

    const __edit = (code) => {
        navigation.navigate('Edit', { product: code })
    }

    return (
        <View>
            <StyledViewTitleText style= {{justifyContent: "center", alignItems: "center"}}>
                <StyledTextTitle >Products List</StyledTextTitle>
            </StyledViewTitleText>

            <ScrollView>
                {
                    Object.values(produts).map((i, index) =>
                        <StyledListItem key={index}>
                            <StyledTestListItem >{i.code}</StyledTestListItem>
                            <StyledTestListItem >{i.name}</StyledTestListItem>
                            <View style={{flexDirection: "row"}}>
                                <TouchableOpacity onPress={() => __edit(i.code)}>
                                    <Ionicons  name={'create'} size= {28} color= {'blue'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => __produtoDelete(i.code)}>
                                    <Ionicons  name={'trash'} size= {28} color= {'red'} />
                                </TouchableOpacity>
                            </View>
                        </StyledListItem>
                    )
                }
            </ScrollView>
        </View>
    )
}