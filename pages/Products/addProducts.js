import React, { useState, useEffect } from 'react';
import { storage, db, auth } from "../../firebase"
import { useIsFocused } from "@react-navigation/native";

import CameraComponent from "../../components/camera";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";

import { SpeedDial } from 'react-native-elements';
import { Text, View, Image, ScrollView} from 'react-native';
import { StyledViewContainer, StyledButtonBack, StyledTextButton, StyledContainerCamera, StyledButtonSave, StyledButtonCancel } from "../../styles/styledComponents";
import { StyledInput } from '../../StyledComponents/Inputs/inputs'; 
import {StyledViewImageAddProduct, StyledViewInputs, StyledViewInputsRow, StyledViewButtonAction} from '../../StyledComponents/Views/view';
import { StyledImageAddProduct } from '../../StyledComponents/Images/images';

export default function AddProducts() {
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const [photoDefault, setPhotoDefault] = useState("https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png");

    const [photo, setPhoto] = useState('')

    const [open, setOpen] = useState(false);

    const user = auth.currentUser.uid;

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const [guardar, setGuardar] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        setPhoto(photoDefault)
    }, [])

    useEffect(() => {
        if (capturedImage != null) {
            setPhoto(capturedImage.uri);
            setGuardar(true);
        } else {
            setGuardar(false);
            setOpen(false)
        }
    }, [capturedImage]);

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === "granted") {
            setPreviewVisible(false);
            setStartCamera(true);
            setCapturedImage(null);
        } else {
            Alert.alert("Access denied");
        }
    };

    const __back = () => {
        setStartCamera(false);
        setPreviewVisible(true);
        setGuardar(false)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setCapturedImage(result);
        }
    };

    const __saveData = async () => {
        if (capturedImage != null) {
            const response = await fetch(capturedImage.uri)
            const blob = await response.blob();
            await storage.ref('products/' + user).child(code).put(blob).then(async res => {
                await storage.ref('products/' + user).child(code).getDownloadURL().then(async profile => {
                    await db.ref('products/' + user).child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: profile }).then(async (res) => {
                        await db.ref('productsgeneral/').child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: profile }).then((res) => {
                            alert('saved');
                            __clear();
                        }).catch(err => {
                            console.log(err)
                        })
                    }).catch(err => {
                        console.log(err)
                    })
                }).catch(e => {
                    console.log(e)
                });
                setOpen(false);
            }).catch(err => {
                console.log('error', err)
                setOpen(false)
            });
        } else {
            db.ref("products/" + user).child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: photo }).then((res) => {
                db.ref('productsgeneral/').child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: photo }).then((res) => {
                    alert('saved');
                    __clear();
                }).catch(err => {
                    console.log(err)
                })
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const __clear = () => {
        setPhoto(photoDefault);
        __back();
        setCode('');
        setName('');
        setDescription('');
        setPrice('');
        setStock('');
        setStartCamera(false);
        setPreviewVisible(true);
        setCapturedImage(null);
        setOpen(false);
    }


    return (
        <StyledViewContainer>
            {(isFocused) ?

                (previewVisible) ?

                    (<StyledViewContainer>
                        <ScrollView style={{ width: '100%', height: '100%' }}>
                            <StyledViewInputs>
                                <StyledInput
                                    onChangeText={setCode}
                                    value={code}
                                    placeholder="Product Code"
                                />
                                <StyledInput
                                    onChangeText={setName}
                                    value={name}
                                    placeholder="Name"
                                />
                                <StyledInput
                                    onChangeText={setDescription}
                                    value={description}
                                    placeholder="Description"
                                    // multiline
                                    // numberOfLines={4}
                                />
                                <StyledViewInputsRow >
                                    <StyledInput
                                        onChangeText={setPrice}
                                        value={price}
                                        placeholder="Price"
                                        keyboardType="decimal-pad"
                                    />
                                    <StyledInput
                                        onChangeText={setStock}
                                        value={stock}
                                        placeholder="Stock"
                                        keyboardType="decimal-pad"
                                    />
                                </StyledViewInputsRow>
                                <StyledViewImageAddProduct>
                                    <StyledImageAddProduct source={{ uri: photo }} />
                                    <SpeedDial
                                        isOpen={open}
                                        icon={{ name: 'camera', color: '#fff' }}
                                        openIcon={{ name: 'close', color: '#fff' }}
                                        onOpen={() => setOpen(!open)}
                                        overlayColor={"none"}
                                        onClose={() => setOpen(!open)}
                                    >
                                        <SpeedDial.Action
                                            icon={{ name: 'camera', color: '#fff' }}
                                            title="Take photo"
                                            onPress={__startCamera}
                                        />
                                        <SpeedDial.Action
                                            icon={{ name: 'photo', color: '#fff' }}
                                            title="Gallery"
                                            onPress={pickImage}
                                        />
                                    </SpeedDial>
                                </StyledViewImageAddProduct>

                                <StyledViewButtonAction >
                                    <StyledButtonCancel><StyledTextButton>Clear</StyledTextButton></StyledButtonCancel>
                                    <StyledButtonSave onPress={__saveData}><StyledTextButton>Save</StyledTextButton></StyledButtonSave>
                                </StyledViewButtonAction>
                                
                            </StyledViewInputs>

                        </ScrollView>
                    </StyledViewContainer>)
                        :
                    (<StyledContainerCamera>

                        < CameraComponent
                            setCapturedImage={setCapturedImage}
                            setPreviewVisible={setPreviewVisible}
                            setStartCamera={setStartCamera}
                        />
                        <StyledButtonBack onPress={__back} >
                            <StyledTextButton>Regresar</StyledTextButton>
                        </StyledButtonBack>
                    </StyledContainerCamera>)
                :
                <Text></Text>
            }
        </StyledViewContainer>
    )
}