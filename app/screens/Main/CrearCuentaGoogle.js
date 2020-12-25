import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Button,
  Text,
  H1,
  Input,
  Item,
  Toast,
  Row,
} from 'native-base';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import auth from '@react-native-firebase/auth';
import axios from 'react-native-axios';
import {useMutation, useQuery} from '@apollo/client';
import {RNS3} from 'react-native-aws3';
import {
  NEW_ACCOUNT,
  AUTHENTICATE_USER,
  ISUSER_FIREBASE,
} from '../../recursos/gql/user';
import {FOLLOW} from '../../recursos/gql/follow';
import {AutoContext} from '../../recursos/context/UsuarioContext';
import MasterFormulario from './MasterFormulario';
const uuid = require('react-native-uuid');
/*
function useCoordenadas() {
  const [coordenadas, setCoordenadas] = useState({
    city: null,
    latitude: null,
    longitude: null,
    country_name: null,
    countryCode: null,
  });
  useEffect(() => {
    axios
      .get('https://ipapi.co/json')
      .then((response) => {
        let data = response.data;
        setCoordenadas({
          city: data.city,
          country_name: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
          countryCode: data.country_calling_code,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return coordenadas;
}
*/
const CrearCuentaEmail = ({navigation, route}) => {
  //const {uid}=route.Userid;
  const {userUid} = route.params;

  const {signIn} = useContext(AutoContext);
  const [newUser] = useMutation(NEW_ACCOUNT);
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const [follow] = useMutation(FOLLOW);
  const [nombre, guardarnombre] = useState('');
  const [apellido, guardarapellido] = useState('');
  const [correo, guardarcorreo] = useState('');
  const [contrasena, guardarcontrasena] = useState('');
  const [dia, guardarDia] = useState('');
  const [mes, guardarMes] = useState('');
  const [ano, guardarAno] = useState('');
  const [sexo, guardarSexo] = useState('');
  const [cuenta, guardarCuenta] = useState('');
  const [mensaje, guardarMensaje] = useState(null);
  //const coordenadas = useCoordenadas();
  const [image, setImage] = useState(
    'https://splayseven.s3.us-east-2.amazonaws.com/avatar/icon-avatar-default.png',
  );
  const [fileUpload, setFileUpload] = useState(null);
  const [uid, setUid] = useState('');
  const [cargando, setCargando] = useState(false);
  const [amazon, setAmazon] = useState('');
  //Calulamos los años
  const f = new Date();
  const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(f);
  const firtsYear = ye;
  const year = new Array(76).fill({label: null}).map((item, id) => {
    return {valor: `${firtsYear - id}`};
  });

  const {data, loading, error} = useQuery(ISUSER_FIREBASE, {
    variables: {
      uidFirebase: userUid.uid,
    },
  });

  if (loading || error) return null;
  const {isUserFirebase} = data;

  if (isUserFirebase) {
    console.log(userUid, lastname);
    guardarnombre(userUid.lastname);
  } else {
    console.log(userUid.displayName);
    // guardarnombre(userUid.displayName);
  }

  const handleSubmit = async () => {
    //Validamos los campos ya que son obligatorios
    //Validadmos que  el correo sea valido

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (nombre === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Nombre es Obligatorio');
      return;
    }
    if (apellido === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Apellido es Obligatorio');
      return;
    }
    if (correo === '' || reg.test(correo) === false) {
      //Mostramos mensaje
      Alert.alert(
        'Error',
        'El Campo Correo es Obligatorio o no cumple con el formato de correo',
      );
      return;
    }

    if (dia === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Dia es Obligatorio');
      return;
    }
    if (mes === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Mes es Obligatorio');
      return;
    }
    if (ano === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Año es Obligatorio');
      return;
    }
    if (sexo === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Sexo es Obligatorio');
      return;
    }
    if (cuenta === '') {
      //Mostramos mensaje
      Alert.alert('Error', 'El Campo Tipo de Cuenta es Obligatorio');
      return;
    }
    if (fileUpload === null) {
      Alert.alert('Error', 'Se tiene que subir Foto o imagen');
      return;
    }
    const {city, country_name, latitude, longitude, countryCode} = coordenadas;

    auth()
      .createUserWithEmailAndPassword(correo, contrasena)
      .then((data) => {
        const {uid} = data.user._user;
        setUid(uid);
        setCargando(true);
        const config = {
          keyPrefix: 'avatar/',
          bucket: 'splayseven',
          region: 'us-east-2',
          accessKey: 'AKIAUZDNW43KSAG2AUMU',
          secretKey: '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',
          successActionStatus: 201,
        };

        RNS3.put(fileUpload, config).then((response) => {
          const file = {
            amazon: response.headers.Location,
            type: fileUpload.type,
          };
          try {
            (async function () {
              const {data: dataUserNew} = newUser({
                variables: {
                  input: {
                    name: nombre,
                    lastname: apellido,
                    email: correo,
                    password: contrasena,
                    gender: sexo,
                    birthdayDay: dia,
                    birthdayMonth: mes,
                    birthdayYear: ano,
                    country: country_name,
                    city: city,
                    latitude: latitude,
                    longitude: longitude,
                    type: cuenta,
                    uidFirebase: data.user._user.uid,
                    avatar: file.amazon,
                  },
                },
              });
            })();

            setCargando(false);

            navigation.navigate('Login');
          } catch (error) {
            console.log(error);
          }
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'El Correo ya Exite');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('correo invalido');
        }
      });
  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      const mimetype = image.mime;
      const extension = mimetype.split('/')[1];
      const filename = `${uuid.v4()}.${extension}`;
      setFileUpload({
        uri: image.sourceURL,
        name: filename,
        type: image.mime,
      });
      setImage(image.path);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      const mimetype = image.mime;
      const extension = mimetype.split('/')[1];
      const filename = `${uuid.v4()}.${extension}`;
      setFileUpload({
        uri: image.sourceURL,
        name: filename,
        type: image.mime,
      });
      setImage(image.path);
    });
  };

  console.log(isUserFirebase);

  return (
    <>
      <Container style={styles.container}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  marginTop: 15,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{uri: image}}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contenido}>
            {isUserFirebase === false ? (
              <MasterFormulario userUid={userUid} />
            ) : (
              <Text>Ya exiite</Text>
            )}
          </View>
        </ScrollView>
      </Container>
    </>
  );
};

export default CrearCuentaEmail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a79d',
  },
  contenido: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginHorizontal: '2.5%',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 25,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFF',
    height: 40,
    marginTop: 30,
  },
  input: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00A79d',
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 6,
    marginTop: 5,
  },
  contenedorFecha: {
    height: 35,
  },
  buttonFecha: {
    width: '100%',
    backgroundColor: '#00a79d',
    borderColor: '#fff',
    borderWidth: 4,
    borderRadius: 6,
    alignContent: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  botonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#00a79d',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
});
