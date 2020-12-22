import React, {useContext} from 'react';
import {AutoContext} from '../../recursos/context/UsuarioContext';
import {View, Button, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather'

const Perfil = () => {
  const {signOut} = useContext(AutoContext);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{flexDirection:'row',marginTop:15}}>
          <Avatar.Image
            source={require('../../assets/icon-avatar-default.png')}
            size={80}
          />
          <View style={{marginLeft:20}}>
            <Title style={styles.title}>Carlos </Title>
            <Caption style={styles.caption}>Velasquez</Caption>
          </View>
        </View>
      </View>
      <View style={styles.userInfoSection}>
          <View style={styles.row}>
              <Icon name='map-marker-radius' color='#777777' size={20}/>
              <Text style={{color:'#777777',marginLeft:20}} >New York</Text>
          </View>
          <View style={styles.row}>
              <Icon name='phone' color='#777777' size={20}/>
              <Text style={{color:'#777777',marginLeft:20}} >503-60319361</Text>
          </View>
          <View style={styles.row}>
              <Icon name='email' color='#777777' size={20}/>
              <Text style={{color:'#777777',marginLeft:20}} >carlosrobertovelasquez@gmail.com</Text>
          </View>
          <View style={styles.row}>
              <Icon name='ticket-account' color='#777777' size={20}/>
              <Text style={{color:'#777777',marginLeft:20}} >Tipo Cuenta</Text>
          </View>
      </View>
      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox,{borderRightColor:'#dddddd',borderRightWidth:1}]} >
              <Title>140</Title>
              <Caption>Amigos</Caption>
              </View>
              <View style={styles.infoBox}>
                  <Title>10</Title>
                  <Caption>Seguidores</Caption>
              </View>
          
      </View>
      <View style={styles.menuWrapper}>
          <TouchableRipple onPress={()=>{}}>
              <View style={styles.menuItem}>
                  <Icon name='account-check-outline' color='#FF6347' size={25}/>
                  <Text style={styles.menuItemText} >Soporte</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={()=>{}}>
              <View style={styles.menuItem}>
                  <Feather name='settings' color='#FF6347' size={25}/>
                  <Text style={styles.menuItemText} >Configuración</Text>
              </View>
          </TouchableRipple>
          <TouchableRipple onPress={()=>signOut()}>
              <View style={styles.menuItem}>
                  <Icon name='exit-to-app' color='#FF6347' size={25}/>
                  <Text style={styles.menuItemText} >Salir</Text>
              </View>
          </TouchableRipple>
      </View>
      
    </SafeAreaView>
  );
};
export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop:15,
    marginBottom:5,
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
