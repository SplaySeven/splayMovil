import React,{useState} from 'react'
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
export default function MasterFormulario(props) {
  const {userUid}=props
  console.log(userUid.email);
const [nombre, guardarnombre] = useState(props.userUid.displayName);
  const [apellido, guardarapellido] = useState('');
  const [correo, guardarcorreo] = useState(userUid.email);
  const [contrasena, guardarcontrasena] = useState('');
  const [dia, guardarDia] = useState('');
  const [mes, guardarMes] = useState('');
  const [ano, guardarAno] = useState('');
  const [sexo, guardarSexo] = useState('');
  const [cuenta, guardarCuenta] = useState('');
  const [mensaje, guardarMensaje] = useState(null);
//Calulamos los años
const f = new Date();
const ye = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(f);
const firtsYear = ye;
const year = new Array(76).fill({label: null}).map((item, id) => {
  return {valor: `${firtsYear - id}`};
});

    return (
        <>
            <Item inlineLabel last style={styles.input}>
            <Input
              placeholder="Nombres"
              value={nombre}
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
                value={correo}
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={(texto) => guardarcorreo(texto)}
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
        </>
    )
}


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
  