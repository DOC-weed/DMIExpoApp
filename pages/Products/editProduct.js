import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { StyledInput, StyledInputsSmall, StyledViewContainer, StyledButtonBack, StyledTextButton, StyledContainerCamera, StyledTitleText, StyledButtonSave, StyledButtonCancel } from "../../styles/styledComponents";
import { SpeedDial } from 'react-native-elements';
import CameraComponent from "../../components/camera";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { storage, db, auth } from "../../firebase";

export default function EditProducts({ route, navigation }) {
    const [startCamera, setStartCamera] = useState(false);
    const [previewVisible, setPreviewVisible] = useState(true);
    const [capturedImage, setCapturedImage] = useState(null);
    const [photoDefault, setPhotoDefault] = useState("https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png");

    const [photo, setPhoto] = useState('');

    const [open, setOpen] = useState(false);

    const [user, setUser] = useState('00000000001');

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const [guardar, setGuardar] = useState(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        __produtoEdit(route.params);
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

    const __produtoEdit = ({product}) => {
        db.ref(user + "/products").child(product).get().then((res) => {
            let objItem = res.val();

            for(const i of [objItem]){
                setCode(i.code);
                setName(i.name);
                setDescription(i.description);
                setPrice(i.price);
                setStock(i.stock);
                setPhoto(i.image);
            }
        }).catch((err) => {
            console.log(err);

        });
    }

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
            await storage.ref(user + "/products").child(code).put(blob).then(async res => {
                await storage.ref(user + "/products").child(code).getDownloadURL().then(async profile => {
                    db.ref(user + "/products").child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: profile }).then((res) => {
                        alert('saved');
                        __clear();
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
            db.ref(user + "/products").child(code).set({ code: code, name: name, description: description, price: price, stock: stock, image: photo }).then((res) => {
                alert('saved');
                __clear();
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
                            <StyledInputsSmall
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
                                multiline
                                numberOfLines={4}
                            />
                            <View style={{ flexDirection: 'row' }}>
                                <StyledInputsSmall
                                    onChangeText={setPrice}
                                    value={price}
                                    placeholder="Price"
                                    keyboardType="decimal-pad"
                                />
                                <StyledInputsSmall
                                    onChangeText={setStock}
                                    value={stock}
                                    placeholder="Stock"
                                    keyboardType="decimal-pad"
                                />
                            </View>
                            <View style={{ margin: 'auto', alignItems: 'center' }}>
                                <Image source={{ uri: photo }} style={{ width: 200, height: 200 }} />
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
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <StyledButtonCancel onPress={ () => navigation.goBack() }><StyledTextButton>Cancel</StyledTextButton></StyledButtonCancel>
                                <StyledButtonSave onPress={__saveData}><StyledTextButton>Save</StyledTextButton></StyledButtonSave>
                            </View>
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