import React, {useState, useContext} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Text, H1, Input, Form, Item, Toast, Button} from 'native-base';
import {AutoContext} from '../../recursos/context/UsuarioContext';
import {AUTHENTICATE_USER} from '../../recursos/gql/user';
import {useMutation} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
export default function LoginCorreo() {
  const {signIn} = useContext(AutoContext);
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const [correo, guardarCorreo] = useState('');
  const [contrasena, guardarContrasena] = useState('');
  const [uid, setUid] = useState('');
  const handleSubmit = async () => {
    if (correo === '' || contrasena === '') {
      Alert.alert('Todos los campos son obligatorios', 'Alerta', [
        {text: 'Ok'},
      ]);
      return;
    }

    auth()
      .signInWithEmailAndPassword(correo, contrasena)
      .then((data) => {
        const {uid} = data.user._user;
        setUid(uid);
        try {
          (async function () {
            const {data, loading} = await authenticateUser({
              variables: {
                input: {
                  uidFirebase: uid,
                  password: contrasena,
                },
              },
            });
            if (loading)
              return (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" />
                  <Text
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      fontWeight: 'bold',
                      fontSize: 15,
                    }}>
                    Cargado Publicación ..
                  </Text>
                </View>
              );
            const {token} = data.authenticateUser;
            signIn(token);
          })();
        } catch (error) {
          console.log(error);
        }
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          console.log('no existe el correo');
        }
        console.error(error);
      });
  };
  return (
    <View style={styles.contenido}>
      <Text style={styles.titulo}>Splay</Text>
      <Form>
        <Item inlineLabel last style={styles.input}>
          <Input
            autoCapitalize="none"
            placeholder="Email"
            keyboardType="email-address"
            autoCorrect={false}
            onChangeText={(texto) => guardarCorreo(texto)}
          />
        </Item>
        <Item inlineLabel last style={styles.input}>
          <Input
            secureTextEntry={true}
            placeholder="Contrasena"
            onChangeText={(texto) => guardarContrasena(texto)}
          />
        </Item>
      </Form>
      <Button style={styles.button} square block onPress={() => handleSubmit()}>
        <Text style={styles.botonText}>Iniciar Sesión</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',

    flex: 1,
    backgroundColor: '#00a79d',
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#00a79d',
    borderColor: '#fff',
    borderRadius: 6,
  },
  botonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
