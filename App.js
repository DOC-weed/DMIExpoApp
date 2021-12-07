import React, {useState} from 'react';
import { auth } from './firebase';

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { TouchableOpacity, Text } from 'react-native';

import Tienda from './pages/Tienda/Tienda';
import Login from './pages/Login/Login';
import Registro from './pages/Registro/Registro';
import Perfil from './pages/Perfil/Perfil';
import AddProducts from './pages/Products/addProducts';
import Cart from "./pages/Buy/Cart"
import OneProduct from "./pages/Buy/OneProduct"
import CheckOut from "./pages/Buy/Checkout"
import EditProducts from './pages/Products/editProduct';
import ListProducts from "./pages/Products/productsList";
import { SpeedDial } from 'react-native-elements';
import Menu from './components/menu';
import Order from './pages/Buy/Order';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function App() {
  

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Singup" options={{ headerShown: false }}>
          {(props) => <Registro {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name= 'Tabs'
          options={{ headerShown: false }}
          component={Tabs}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Tabs() {
  const navigation = useNavigation();
  const [show, setshow] = useState(true);
  const [hide, sethide] = useState(false);
  const closeBTN =()=>{
    setshow(true);

  }
  const handleSignOut = () => {
    setshow(false)
    /*auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });*/
  };
  return(

    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Tienda") {
          iconName = focused
            ? "ios-book"
            : "ios-book-outline";
        } else if (route.name === "Perfil") {
          iconName = focused
            ? "ios-person"
            : "ios-person-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "#5F366E",
      tabBarInactiveTintColor: "gray",
    })}>
      <Tab.Screen name="Tienda" component={BuySettings}  options={{
        headerLeft: () => (
          <TouchableOpacity >
             {(show)? <Ionicons onPress={handleSignOut} name={'menu-outline'} size= {40} color= {'black'} />:<Menu closeB={closeBTN}/>}
              
          </TouchableOpacity>
        ),
        headerRight: ()=>(
          <TouchableOpacity>
            {(!show)?<Text style={{fontSize:50,marginRight:20}} onPress={()=>{setshow(true)}} >&times;</Text>:null}
            </TouchableOpacity>
        )
      }}/>
      <Tab.Screen name="Perfil" component={PerfilSettings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function PerfilSettings() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Perfil' component={Perfil}  />
      <Stack.Screen name='Add' component={AddProducts} />
      <Stack.Screen name='List' component={EditProductSettings} />
    </Stack.Navigator>
  )
}

function EditProductSettings(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='List' component={ListProducts} options={{ headerShown: false }}/>
      <Stack.Screen name='Edit' component={EditProducts} />
    </Stack.Navigator>
  )
}

function BuySettings(){
  return (
    <Stack.Navigator>
      <Stack.Screen name='Tienda' component={Tienda}  options={{ headerShown: false }}/>
      <Stack.Screen name='Detalles' component={OneProduct} />
      <Stack.Screen name='Cart' component={Cart} />
      <Stack.Screen name='CheckOut' component={CheckOut} />
      <Stack.Screen name='Orders' component={Order} />
    </Stack.Navigator>
  )
}

