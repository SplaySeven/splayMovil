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
import {useMutation} from '@apollo/client';
import {RNS3} from 'react-native-aws3';
import {NEW_ACCOUNT, AUTHENTICATE_USER} from '../../recursos/gql/user';
import {FOLLOW} from '../../recursos/gql/follow'
import {AutoContext} from '../../recursos/context/UsuarioContext';
const uuid = require('react-native-uuid');

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

const CrearCuentaEmail = ({navigation}) => {
  const {signIn} = useContext(AutoContext);
  const [newUser] = useMutation(NEW_ACCOUNT);
  const [authenticateUser] = useMutation(AUTHENTICATE_USER);
  const [follow]=useMutation(FOLLOW);
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
  const coordenadas = useCoordenadas();
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
    if (contrasena === '' || contrasena.length < 6) {
      //Mostramos mensaje
      Alert.alert(
        'Error',
        'El Campo Contraseña es Obligatorio y mayor de 6 carateres',
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
    if (fileUpload===null){
      Alert.alert('Error','Se tiene que subir Foto o imagen');
      return;
    }
    const {city, country_name, latitude, longitude, countryCode} = coordenadas;

    auth()
      .createUserWithEmailAndPassword(correo, contrasena)
      .then((data) => {
        const {uid}=data.user._user
        setUid(uid)
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
           (async function(){    

              const {data: dataUserNew} =  newUser({
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

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Subir Foto</Text>
        <Text style={styles.panelSubtitle}>Elige tu foto de perfil</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Tomar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Elije de la biblioteca</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
  const bs = React.createRef();
  const fall = new Animated.Value(1);
  const MostarAlerta = () => {
    Toast.show({
      text: mensaje,
      buttonText: 'OK',
      duration: 5000,
    });
  };

  //Cargado
  if (cargando)
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
          Procesado ...Creacion de Cuenta
        </Text>
      </View>
    );

  return (
    <>
      <Container style={styles.container}>
        <BottomSheet
          ref={bs}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
        />
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
            <Item inlineLabel last style={styles.input}>
              <Input
                placeholder="Nombres"
                onChangeText={(texto) => guardarnombre(texto)}
              />
            </Item>
            <Item inlineLabel last style={styles.input}>
              <Input
                placeholder="Apellidos"
                onChangeText={(texto) => guardarapellido(texto)}
              />
            </Item>
            <Item inlineLabel last style={styles.input}>
              <Input
                placeholder="Email"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(texto) => guardarcorreo(texto)}
              />
            </Item>
            <Item inlineLabel last style={styles.input}>
              <Input
                placeholder="Contraseña"
                secureTextEntry={true}
                onChangeText={(texto) => guardarcontrasena(texto)}
              />
            </Item>
            <View>
              <Text>Fecha Nacimiento</Text>
              <View style={{flexDirection: 'row', width: '100%'}}>
                <Picker
                  mode={'dropdown'}
                  style={{width: 90, marginLeft: 50}}
                  accessibilityLabel="Dia"
                  itemStyle={{
                    height: 50,
                    borderWidth: 2,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}
                  selectedValue={dia}
                  onValueChange={(value) => guardarDia(value)}>
                  <Picker.Item label="Dia" value="" />
                  <Picker.Item label="01" value="01" />
                  <Picker.Item label="02" value="02" />
                  <Picker.Item label="03" value="03" />
                  <Picker.Item label="04" value="04" />
                  <Picker.Item label="05" value="05" />
                  <Picker.Item label="06" value="06" />
                  <Picker.Item label="07" value="07" />
                  <Picker.Item label="08" value="08" />
                  <Picker.Item label="09" value="09" />
                  <Picker.Item label="10" value="10" />
                  <Picker.Item label="11" value="11" />
                  <Picker.Item label="12" value="12" />
                  <Picker.Item label="13" value="13" />
                  <Picker.Item label="14" value="14" />
                  <Picker.Item label="15" value="15" />
                  <Picker.Item label="16" value="16" />
                  <Picker.Item label="17" value="17" />
                  <Picker.Item label="18" value="18" />
                  <Picker.Item label="19" value="19" />
                  <Picker.Item label="20" value="20" />
                  <Picker.Item label="21" value="21" />
                  <Picker.Item label="22" value="22" />
                  <Picker.Item label="23" value="23" />
                  <Picker.Item label="24" value="24" />
                  <Picker.Item label="25" value="25" />
                  <Picker.Item label="26" value="26" />
                  <Picker.Item label="27" value="27" />
                  <Picker.Item label="28" value="28" />
                  <Picker.Item label="29" value="29" />
                  <Picker.Item label="30" value="30" />
                  <Picker.Item label="31" value="31" />
                </Picker>
                <Picker
                  mode={'dropdown'}
                  style={{width: 90}}
                  accessibilityLabel="Mes"
                  itemStyle={{
                    height: 50,
                    borderWidth: 2,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}
                  selectedValue={mes}
                  onValueChange={(value) => guardarMes(value)}>
                  <Picker.Item label="Mes" value="" />
                  <Picker.Item label="Ene" value="01" />
                  <Picker.Item label="Feb" value="02" />
                  <Picker.Item label="Mar" value="03" />
                  <Picker.Item label="Abr" value="04" />
                  <Picker.Item label="May" value="05" />
                  <Picker.Item label="Jun" value="06" />
                  <Picker.Item label="Jul" value="07" />
                  <Picker.Item label="Ago" value="08" />
                  <Picker.Item label="Sep" value="09" />
                  <Picker.Item label="Oct" value="10" />
                  <Picker.Item label="Nov" value="11" />
                  <Picker.Item label="Dic" value="12" />
                </Picker>
                <Picker
                  mode={'dropdown'}
                  style={{width: 90, height: 50}}
                  itemStyle={{
                    height: 50,
                    borderWidth: 2,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}
                  selectedValue={ano}
                  onValueChange={(value) => guardarAno(value)}>
                  <Picker.Item label="Año" value="" />
                  {year.map((v, index) => {
                    return (
                      <Picker.Item
                        key={v.valor}
                        label={v.valor}
                        value={v.valor}
                      />
                    );
                  })}
                </Picker>
              </View>
            </View>
            <View>
              <View>
                <Picker
                  mode={'dropdown'}
                  itemStyle={{
                    height: 50,
                    borderWidth: 2,
                    backgroundColor: '#fff',
                    margin: 8,
                    borderRadius: 10,
                  }}
                  selectedValue={sexo}
                  onValueChange={(value) => guardarSexo(value)}>
                  <Picker.Item label="Seleciona Sexo" value="" />
                  <Picker.Item label="Hombre" value="H" />
                  <Picker.Item label="Mujer" value="M" />
                  <Picker.Item label="Personalizado" value="P" />
                </Picker>
              </View>
            </View>
            <View>
              <View>
                <Picker
                  mode={'dropdown'}
                  itemStyle={{
                    height: 50,
                    borderWidth: 2,
                    backgroundColor: '#fff',
                    margin: 8,
                    borderRadius: 10,
                  }}
                  selectedValue={cuenta}
                  onValueChange={(value) => guardarCuenta(value)}>
                  <Picker.Item label="Seleciona Cuenta" value="" />
                  <Picker.Item label="Personal" value="P" />
                  <Picker.Item label="Empresarial" value="E" />
                  <Picker.Item label="Premiun" value="M" />
                </Picker>
              </View>
            </View>
            <Button
              style={styles.button}
              square
              block
              onPress={() => handleSubmit(false)}>
              <Text style={styles.botonText}>Crear Cuenta</Text>
            </Button>
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
