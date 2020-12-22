import React from 'react';
import {View,ActivityIndicator,ScrollView,StyleSheet,TextInput,Text} from 'react-native';
import Avatar from '../../components/Avatar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery} from '@apollo/client';
import {GET_USER} from '../../recursos/gql/user';





const ToolBar = (props) => {
    const {userId}=props
    const {data,loading,error}=useQuery(GET_USER,{
        variables:{id:userId}
    });
    if(loading) return( 
        <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
          <ActivityIndicator size="large"/>
        </View>)
    const {getUser}=data
    const{avatar}=getUser
    return (
        <React.Fragment>
       <View style={styles.Container}>
           <View style={styles.Row}>
               <Avatar
               source={{uri:avatar }}
               />
               <TextInput style={styles.Input} placeholder='Que estas pensando?'/>
           </View>
           <View style={styles.Divider}/>
           
       </View>
       <View style={styles.BottomDivider}/>
       </React.Fragment>
    )
}

export default ToolBar

const styles=StyleSheet.create({
    Container:{
        width:'100%',
        height:50,
    },
    Row:{
        flexDirection:'row',
        backgroundColor:'#ffffff',
        width:'100%',
        paddingVertical:0,
        paddingHorizontal:11,
        alignItems:'center',
    },
    Divider:{
        width:'100%',
        height:0.5,
        backgroundColor:'#f0f0f0',
    },
    Input:{
        height:50,
        width:'100%',
        paddingVertical:0,
        paddingHorizontal:8,
    },
    Menu:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:42,
    },
    MenuText:{
        paddingLeft:11,
        fontSize:12,
        fontWeight:'bold',
    },
    Separator:{
        width:1,
        height:26,
        backgroundColor:'#F0F0F0',
    },
   BottomDivider:{
       width:'100%',
       height:9,
       backgroundColor:'#f0f2f5',
   },

})




