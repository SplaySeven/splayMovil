import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

const editProfile = () => {
 const renderInner=()=>{
     <View style={styles.panel}>
<Text>Helo</Text>
     </View>
   
 }
 const renderHeader=()=>{
     <View style={styles.header}>
         <View style={styles.panelHeader}>
             <View style={styles.panelHandle}></View>

         </View>

     </View>
 }

    const bs=React.createRef();
    const fall=new Animated.Value(1);
  return (
    <View style={styles.container}>
        <BottomSheet
        ref={bs}
        snapPoints={[330,0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        />
      <View style={{margin: 20}}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() =>bs.current.snapTo(0) }>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={require('../../assets/icon-avatar-default.png')}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <Icon name='camera' size={35} color='black' style={{
                            opacity:0.7,
                            alignItems:'center',
                            justifyContent:'center',
                            borderWidth:1,
                            borderColor:'#fff',
                            borderRadius:10,
                        }}/>
                    </View>
                </ImageBackground>
                
            </View>
          </TouchableOpacity>
          <Text style={{marginTop:10,fontSize:18,fontWeight:'bold'}}>Carlos Velasquez</Text>
        </View>
        <View style={styles.action}>
            <FontAwesome name='user-o' size={20}/>
         <TextInput
         placeholder="Nombres"
         placeholderTextColor="#666666"
         autoCorrect={false}
         style={styles.textInput}
         />
        </View>
        <View style={styles.action}>
            <FontAwesome name='user-o' size={20}/>
         <TextInput
         placeholder="Apellidos"
         placeholderTextColor="#666666"
         autoCorrect={false}
         style={styles.textInput}
         />
        </View>
        <View style={styles.action}>
            <FontAwesome name='envelope-o' size={20}/>
         <TextInput
         placeholder="Direccion Correo"
         placeholderTextColor="#666666"
         autoCorrect={false}
         keyboardType='email-address'
         style={styles.textInput}
         />
        </View>
        <View style={styles.action}>
            <FontAwesome name='birthday-cake' size={20}/>
         <TextInput
         placeholder="Fecha Nacimiento"
         placeholderTextColor="#666666"
         autoCorrect={false}
         style={styles.textInput}
         />
        </View>
        <View style={styles.action}>
            <Icon name='human-male-male' size={20}/>
         <TextInput
         placeholder="Sexo"
         placeholderTextColor="#666666"
         autoCorrect={false}
         style={styles.textInput}
         />
        </View>
        <View style={styles.action}>
            <Icon name='ticket-account' size={20}/>
         <TextInput
         placeholder="Tipo Cuenta"
         placeholderTextColor="#666666"
         autoCorrect={false}
         style={styles.textInput}
         />
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={()=>{}} >
            <Text style={styles.panelButtonTitle} >Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#00A79D',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
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
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});
