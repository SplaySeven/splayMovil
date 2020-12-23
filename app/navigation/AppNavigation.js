import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

//pantallas
import Login from '../screens/Main/Login';
import CrearCuenta from '../screens/Main/CrearCuenta';
import LoginCorreo from '../screens/Main/LoginCorreo';
import CrearCuentaEmail from '../screens/Main/CrearCuentaEmail';

const Stack = createStackNavigator();
const AppNavigation = ({navigation}) => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen
      name="Login"
      component={Login}
      options={{
        title: 'Inicio',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="CrearCuenta"
      component={CrearCuenta}
      options={{
        title: 'Crear Cuenta',
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="LoginCorreo"
      component={LoginCorreo}
      options={{
        title: 'Cuenta',
      }}
    />
    <Stack.Screen
      name="CrearCuentaEmail"
      component={CrearCuentaEmail}
      options={{
        title: 'Crear Cuenta Email',
      }}
    />
  </Stack.Navigator>
);

export default AppNavigation;
