import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import React, {useState, useMemo, useEffect,useReducer} from 'react';
import {AutoContext} from './app/recursos/context/UsuarioContext';
import {ActivityIndicator} from 'react-native-paper';
import jwtDecode from 'jwt-decode';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

//Compomentes
import AppNavigation from './app/navigation/AppNavigation';
import AppMainTab from './app/navigation/AppMainTab';

const App = () => {
  const initialLoginState={
    isLoading:true,
    useName:null,
    userToken:null,
  };
  const loginReduce=(prevState,action)=>{
    switch (action.type) {
      case 'RETRIVE_TOKEN':
        return {
          ...prevState,
          userToken:action.token,
          isLoading:false,
        };
        case 'LOGIN':
        return {
          ...prevState,
          userName:action.id,
          userToken:action.token,
          isLoading:false,
        };
        case 'LOGOUT':
        return {
          ...prevState,
          userName:null,
          userToken:null,
          isLoading:false,
        };
        case 'REGISTER':
        return {
          ...prevState,
          userName:action.id,
          userToken:action.token,
          isLoading:false,
        };
    }
  };
  const [loginState,dispatch]=useReducer(loginReduce,initialLoginState);
  const authContext=useMemo(() =>({
    signIn:async(foundUser)=>{
      //setUserToken('fgkj');
      //setIsLoading(false);
      const Auth=jwtDecode(foundUser)
      const userToken=foundUser
      const userName=Auth.id
        try {
          await AsyncStorage.setItem('userToken',userToken)
        } catch (error) {
          console.log(error)
        }
      
      dispatch({type:'LOGIN',id:userName,token:userToken})
    },
    signOut:async()=>{
      try {
        await AsyncStorage.removeItem('userToken')
      } catch (error) {
        console.log(error)
      }
      dispatch({type:'LOGOUT'})
    },
    signUp:()=>{
     setUserToken('fgkl');
     setIsLoading(flase);
    },
  }) , [] );
  useEffect(() => {
    setTimeout(async()=>{
      let userToken;
      userToken=null;
      try {
        userToken=await AsyncStorage.getItem('userToken');
      } catch (error) {
        console.log(error)
      }
      dispatch({type:'REGISTER',token:userToken})
    },1000)
  }, [])

  if(loginState.isLoading){
    return(
      <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
  }

  
  return (
   <AutoContext.Provider value={authContext}>
     <NavigationContainer>
     {loginState.userToken !== null?<AppMainTab/>:<AppNavigation/>}
     </NavigationContainer>
   </AutoContext.Provider>
  );
};

export default App;
