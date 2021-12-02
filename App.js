import React from 'react';
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

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
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
      <Tab.Screen name="Tienda" component={Tienda} options={{
        headerRight: () => (
          <TouchableOpacity style={{backgroundColor: "red"}} onPress={handleSignOut}>
              <Ionicons name={'ios-log-out'} size= {20} color= {'white'} />
          </TouchableOpacity>
        )
      }} />
      <Tab.Screen name="Perfil" component={Perfil}  />
    </Tab.Navigator>
  );
}

