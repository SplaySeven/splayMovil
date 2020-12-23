import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {createUploadLink} from 'apollo-upload-client';
import fetch from 'node-fetch';
import {setContext} from 'apollo-link-context';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const uri =
  Platform.OS === 'ios'
    ? 'http://192.168.1.16:4000/graphql'
    : 'http://10.0.2.2:4000';
//Conexion o local o herokuapp.com
const httpLink = createUploadLink({
  uri,
  //uri:'https://splayserver.herokuapp.com',
  fetch,
});
const authLink = setContext(async(_, {headers}) => {
  //Leer el Storage alamacenado
const token =await AsyncStorage.getItem('userToken');
return {
  headers:{
    ...headers,
    authorization:token? `Bearer ${token}`:''
  }
}
});
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});
export default client;