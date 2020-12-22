import React, {useState, useEffect, useContext} from 'react';
import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {AutoContext} from '../../recursos/context/UsuarioContext';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
//Vistas

import AppBar from '../../screens/walls/AppBar';
import Toolbar from '../../screens/walls/ToolBar';
import Users from '../../screens/walls/Users';
import Feeds from '../../screens/walls/Feeds';
const wall = () => {
  const {signOut} = useContext(AutoContext);
  const [auth, setAuth] = useState('');
  const [userId, setUserId] = useState('');
  useEffect(() => {
    userToken();
  }, []);
  const userToken = async () => {
    try {
      const Token = await AsyncStorage.getItem('userToken');
      if (Token !== null) {
        const User = jwtDecode(Token);
        setUserId(User.id);
      } else {
        signOut();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar/>
      <Toolbar userId={userId}/>
      <Users userId={userId}/>
      <Feeds userId={userId}/>
    </SafeAreaView>
  );
};

export default wall;
const styles = StyleSheet.create ({
    container: {
      flex: 1,
      backgroundColor: '#00a79d',
      padding: 20,
    },
  });
