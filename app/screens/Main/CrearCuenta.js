import React,{useState} from 'react'
import {View,Alert,StyleSheet,Image,TouchableOpacity} from 'react-native'
import {Button,Text,H1,Input,Form,Item,Toast,Row} from 'native-base'
import {useNavigation} from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons';

const CrearCuenta = ({navigation}) => {
    return (
        <View style={styles.contenido}>
            <View style={styles.logo}>
                <Image source={require('../../assets/SP7.png')} style={styles.imagenLogo}/>
            </View>
            <View style={styles.Contenedortitulo}>
                <Text style={styles.titulo}>Crear una cuenta</Text>
            </View>
                <TouchableOpacity style={styles.BottonCorreo} onPress={()=>navigation.navigate('CrearCuentaEmail')} >
                    <Icon name='mail-outline' size={25} color='black'/>
                    <Text style={styles.TextoBtnCorreo}>Regístrate con tu correo eletrónico</Text>
                </TouchableOpacity>
                <View style={{borderBottomColor:'white',borderBottomWidth:2, marginTop:20,marginBottom:20}}>

                </View>
                <TouchableOpacity style={styles.BottonCorreo}>
                    <Icon name='logo-google' size={25} color='black'/>
                    <Text style={styles.TextoBtnCorreo}> Regístrate con Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BottonCorreo}>
                    <Icon name='logo-facebook' size={25} color='black'/>
                    <Text style={styles.TextoBtnCorreo}> Regístrate con Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.BottonCorreo}>
                    <Icon name='call-outline' size={25} color='black'/>
                    <Text style={styles.TextoBtnCorreo}> Regístrate con telefono</Text>
                </TouchableOpacity>
                <View style={styles.ContainerCrearCuenta}>
                    <Text style={styles.crearCuentaTitulo}>¿Tienes una cuenta?</Text>
                    <TouchableOpacity onPress={()=>navigation.navigate('Login')} >
                        <Text style={styles.crearCuentaLink} >Iniciar sesión</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ContainerTerminos}>
                    <Text style={styles.TextTerminos2}>Al utilizar nuestros servicios,acepta nuestros</Text>
                <View/>
                <View style={styles.ContainerTerminos2}>
                            <TouchableOpacity>
                        <Text style={styles.TextTerminos} >Terminos</Text>
                    </TouchableOpacity>
        
                    <Text style={styles.TextTerminos2}> y </Text>
                    <TouchableOpacity>
                        <Text style={styles.TextTerminos}>Declaracion de privacidad</Text>
                    </TouchableOpacity>
                </View>
                </View>    
            
        </View>
      
    )
}

export default CrearCuenta

const styles=StyleSheet.create({
    
    contenido:{
        flexDirection:"column",
        justifyContent:"center",
        flex:1,
        backgroundColor:'#00a79d'
    },
    logo:{
        width:'100%',
        height:50,
        marginTop:25,
        alignItems:'center',
        textAlign:'center',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:11,
    },
    imagenLogo:{
        width:215,
        height:75,
    },
    Contenedortitulo:{
        flexDirection:'column',
        marginTop:5,
        height:100,
        width:'100%',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
    },
    titulo:{
        fontSize:40,
        fontWeight:'bold',
        color:'#595b61',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
    },
    BottonCorreo:{
        flexDirection:'row',
        marginHorizontal:8,
        marginVertical:10,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:6,
        borderColor:'#595b61',
    },
    TextoBtnCorreo:{
        backgroundColor:'#fff',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
        fontSize:16,
        color:'#595b61',
        paddingLeft:10,
    },
    ContainerCrearCuenta:{
        flexDirection:'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginTop:75,
    },
    
    crearCuentaTitulo:{
        color:'#fff',
        paddingRight:5,
    },
    crearCuentaLink:{
        color:'#fff',
        fontWeight:'bold',
    },
    input:{
        backgroundColor:'#FFF',
        marginBottom:20,
    },
    button:{
        backgroundColor:'#00A79d',
        borderColor:'#fff',
        borderWidth:4,
        borderRadius:6,
    },
    botonText:{
        color:'#FFF',
        textTransform:'uppercase',
        fontWeight:'bold',
    },
    enlace:{
        color:'#FFF',
        marginTop:60,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:18,
        textTransform:'uppercase',
    },
    ContainerTerminos:{
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginTop:75,
    },
    ContainerTerminos2:{
        flexDirection:'row',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginTop:10,
    },
    TextTerminos:{
        color:'#fff',
        textDecorationLine:'underline',
        fontWeight:'bold',
        
    },
    TextTerminos2:{
        color:'#fff',
    },
})
