import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { StyledContainerImage, StyledImage, StyledViewContainer, StyledButtonBack, StyledTextButton, StyledContainerCamera, StyledTitleText } from "../../styles/styledComponents";
import { SpeedDial } from 'react-native-elements';
import CameraComponent from "../../components/camera";
import { storage, auth, db } from "../../firebase"
import { useNavigation } from "@react-navigation/core";



export default function Perfil({ navigation }) {
  const [startCamera, setStartCamera] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [capturedImage, setCapturedImage] = useState(null);

  const [guardar, setGuardar] = useState(false);
  const isFocused = useIsFocused();

  const [photoDefault, setPhotoDefault] = useState("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAADmCAMAAACJZRt4AAAAe1BMVEUAAAD///8EBATh4eH39/djY2OGhoZpaWmurq6tra20tLSRkZH8/Pzo6OhAQEDt7e2Xl5fOzs7ExMRTU1N0dHR8fHxubm7b29shISGhoaFKSkri4uKAgIAtLS0cHBy+vr5DQ0M4ODibm5tOTk6kpKQmJiYuLi5bW1sXFxc8GMqSAAAIz0lEQVR4nO2d6VrqPBSFK5QZ0SKjItOnR+//Cj96OEraZto7K0nL0/VL/EHy0mZn2EOShztWErsDPtXCNVUtXFPVwjVVLVxT5R1u2p2PPpaD3iz51aw3WJ6H827qu22PcOl6tHtJtHpZjjKPiJ7gusPFRs91034x7PrphQe4p/HKluumwfgJ3xM03HryTie7ajNZgzsDhVtPuGA/6kP5cHDplv3MRH1ucRYGBZf1EGRX9TJQpzBwY2vTaKfNCNItANz0jCW76nlaA7ipsxFRaeKM5wr37Ast13NUuKFPtFxuY88FLtsnSccn2uXLv10sJx8uBRp/nXr8dRkbbhQGLddHYLjHmblPOJ0eQ8JtQ6Ll2gaDS4+h2ZLklbPiZMDNPdtImS4NzkPA9UOD/WjnHS4NakmKmlFfTSLcOh5aLuJWlgZ3iMuWJAd/cN42APaa+IJbxCbLrebCD5zhgDWUXnzAvYaf3WTqJK94uFNsqptmaLgasSXJHyxcrdisn50dXE3G2012484KriZ2UpSVzbSBW9XtudnOdxZwNViXyGSxVjHDHer33HJ1LNaZRrjI+wCdjHsEE1wam0An0/7OBBdxb2qWabozwO1i91+vvgvcPHbvTdKfGmnhaj3grtIOOy3cMXbXzTpy4bb1nOFEdbRn0Rq4x9g9t5PGj6CBq/UscNOJAxfQR+UmtfdVCdcAS/kjpcVUwgXymyLUo8JlsXtMkcpvroLbY5vf78brv2Yt7c63X9jvvnw7DQ5qTfbbss9+Dn7pFTZFAQdseCZ9aVLs/p4C9wxbm3SUcSRTnOuho4g1ksJNYc1q9yTITb40TkwKB3tlTOE/uDND6XGRDA724MyxPzgHu+zRyeDOoBFn48KGvSSyUSeDAzVn556HPTs7uDGmMduQJtSUPrSCQ8Qrd5KxJRvsRfm0gcOsKpWL2apQM0LVNFfhMCsjSnzyEtJiMjDDYfZxpCg71NRTsWAVOEy0IYUNFgVe+UUr3YDkrJxpcKBHVzEpZTjM6KZGoIFGXdntU4aDrBgIcTBXgfb95QVmGQ7SiP0cB222MtRLnzFvJT1YfgBpt/xeluAw61gyG+pYo/ReljryiWiiOpsaBVqllOxlEe4J0gQpJhLZcHlAFOEwGwJOdhGk4bIpK8JhxjXdWMLgVho4TAsR4Uo44ocupoGYcG9KOFCun2RPHAyu0HYBDnRMGtGgFOPdCnCghOglnQ3mot6o4FD+xi86HM5jJm5IEh8t0OFwqebiSYrYEZjfil7e5D9U04UBL8LBAr3IeYo4z0shEU2Eg7klTlQ4YAKUuFEW4XAtUN/LV1zTBaDbn8DgDOJk8IZruXBiKsCBFl9/RTshYtQsUkt4awQ4ZHDlqkoQ6MGJIZgCHDSCgTLqjsiGxdWlAPeBbOLbng0cZCYcCAtwoJPRf7K2KejIR6FhAQ50vPYjy43PFB2wKhxPCXDoUDa7SibwqE7BM5h4bMaGDjl9XyVEPQtw8GbM5w2pj6TDQHCmcgp+8oRCwSXvb1WkX3nKXQsGd7HMKu/4wVdcf0C4JOnLnD4HiAdXqqBwFwM2KvJlXvOfAsPlGpzH8yzLxqPl0W9DMeDCqYVrqqRwDcndMUm+/GpQDohO8oUzeMsTS/ItD3azetXLYLHsy7Vc9cBpJ1fJN6vgAnovW4uy6N0x/CcVaioKcKgyo/ma8fVgH3CZYWvAyQ+IcEd7fWrJxvE3rG3F0R7qUHbBKWiIq04rP5TFHKdrd3A6oQaf/DgdskRhRA/9CLQvF4GEvwEuLLeq5wgXpOizFuGcX4yOa8H6pXuijcr56HquvXEvxu9+rCKeBQMd/t+AUu7udGI8KTBUA3OJgmugj/gL44JsmLWWK3KzKsogG6dfjVYzVCO3yAZ1eJTDMoER+quS09BXB7Y5+G9xbG4vkDokkbtGoWTLWcjlxSziFD5xwwrekWwuE64uDJgbwI26a+a3V1zpAriZEfAF+4sQO/ZAF3rPTJqAjrhc3FFXGh6QdBc0G9tg6tNdWHsqUriQnZhznT5RiTWUYYsTx34knfKXlD5z3ksfFxuyTohNyYGM91KSfe4ulr00pXUy7CWlVLu1OIO/spQApFJjrlMribO3NKdS07+VcTOJhRhw5iR4+lD2c4/oHzKbRfkC+hSD2oIXRfcW2hSeIJsUDxekcuAkC1wJHHU/7geOPDokC1xAmR4/Y44czycDkfyPWNKsHvOcrNYFojQWequai2wsZV8CKWqGvpOY4ZOxLmpG3yuCd6vpiewQsS9HRy8k+IU0meTzIVIhQc7iZ4fCY10lrKCQ/5tzuNYDLDIfeeccihwGbNnV1WjN37m+HfrM8FnV6ZsK7q4L5jYpzI1c6vi+i1RjM858ilFevDHBpZqLQjRwd13S/64vY/CR/wXXUdd/LVwDLCb/ApS7vrom4kXGdnK6dKjm84HjdVH1HnauF33d9RVt93253n1fiwiJX0ULdqHlfV9FWrtLZG0vb7aMIanZdAe9/jf3S9To2Z0sO20d/VOjZ2fLZg9Xl3Hn5bL02thML9fc59Fm0Z+d3fzGgavDWoWUCEULJwTWxOOJFkNHjJWMvEcgejmpgaBpxClhRnWy0KNco508GGr+QODyU6PgVrPDCjHjxCenEc4zjxy/Hy/4OriThFzI1QHu4dFHwS6lTszYOXbYfMALdNnRqvycgDSQ77XH97K7JDxke8928/LlG5fYK7dsDlzRAYXc4qddU1VwdcFLyl8JeVxQOLiHqbetwsQ5NRuQZDQFXUJW1DMg6xyTQTWE3Odz04ZzWUVVqPSwDFieqYeKTsXlvqUfkMf3ucXlPUET+7rOxmUCDbpFZy2uJ/RUjn96x5I94OEuehozMrJXYw/pCR7gcr0NF9YjcL8YcusWGeQJLle6HvUNB7lfu6FD9KlRHuGumnbnw/Ny0BMOlma9wXI7nHc9Yl3lHS6mWrimqoVrqlq4pqqFa6pauKaqhWuqWrimqoVrqlq4puqu4f4HRNuOOCBqNSsAAAAASUVORK5CYII=")
  const [photo, setPhoto] = useState("");

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const user = auth.currentUser.uid;

  const [userData, setUserData] = useState({});


  useEffect(() => {
    __getProfilePhoto();
    getUserData();
  }, [isFocused])

  const getUserData = () => {
    db.ref('user/' + user).get().then((res) => {
      let objItem = res.val();
      console.log(objItem)
      setUserData(objItem);
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

  const __getProfilePhoto = async () => {
    await storage.ref(user + "/profile").getDownloadURL().then(profile => {
      setPhoto(profile);
      setCapturedImage(null);
    }).catch(e => {
      console.log(e)
      setPhoto(photoDefault);
      setCapturedImage(null);
    });
  }

  useEffect(() => {
    if (capturedImage != null) {
      setPhoto(capturedImage.uri);
      setGuardar(true);
    } else {
      setGuardar(false);
      setOpen(false)
    }
  }, [capturedImage]);

  const __back = () => {
    setStartCamera(false);
    setPreviewVisible(true);
    setGuardar(false)
    __getProfilePhoto();
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

  const _guardar = async () => {
    const response = await fetch(capturedImage.uri)
    const blob = await response.blob();
    await storage.ref(user + "/profile").put(blob).then(res => {
      __getProfilePhoto();
      setOpen(false);
    }).catch(err => {
      console.log('error', err)
      __getProfilePhoto();
      setOpen(false)
    });
  }

  return (
    <StyledViewContainer>
      {(isFocused) ?

        (previewVisible) ?

          (<StyledViewContainer>
            <StyledContainerImage>
              <StyledTitleText>Profile</StyledTitleText>
              <StyledImage source={{ uri: photo }} />
              {
                (!guardar) ?

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
                  :
                  <SpeedDial
                    isOpen={open}
                    icon={{ name: 'edit', color: '#fff' }}
                    openIcon={{ name: 'close', color: '#fff' }}
                    onOpen={() => setOpen(!open)}
                    overlayColor={"none"}
                    onClose={() => setOpen(!open)}

                  >
                    <SpeedDial.Action
                      icon={{ name: 'save', color: '#fff' }}
                      title="Guardar"
                      onPress={_guardar}
                    />
                    <SpeedDial.Action
                      icon={{ name: 'close', color: '#fff' }}
                      title="Cancelar"
                      onPress={__back}
                    />
                  </SpeedDial>
              }
            </StyledContainerImage>

            {
              Object.values([userData]).map((i, index) =>
                <View key={index} style={{ margin: 'auto' }}>
                  <Text style={{ textAlign: 'center', fontSize:20  }}>Name: {i.name}</Text>
                  <Text style={{ textAlign: 'center', fontSize: 20}}>Country: {i.country}</Text>
                  <Text style={{ textAlign: 'center', fontSize:20 }}>Phone: {i.phone}</Text>
                  <Text style={{ textAlign: 'center', fontSize:20  }}>Email: {i.email}</Text>
                </View>
              )
            }

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
                title="Products"
                onPress={() => navigation.navigate('Add')}
              />
              <SpeedDial.Action
                icon={{ name: 'list', color: '#fff' }}
                title="List"
                onPress={() => navigation.navigate('List')}
              />
            </SpeedDial>
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
    </StyledViewContainer >
  );
}