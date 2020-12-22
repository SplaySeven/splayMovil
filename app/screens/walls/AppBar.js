import React from 'react';
import {View,TouchableOpacity,Text,Row,StyleSheet} from 'react-native'
import Feather from 'react-native-vector-icons/Feather';


const styles=StyleSheet.create({
  Container:{
    width:'100%',
    height:58,
    paddingVertical:0,
    paddingHorizontal:11,
    flexDirection:'row',
    justifyContent:"space-between",
    backgroundColor:'#00a79d',
  },
  row:{
    flexDirection:'row',
  },
  Button:{
    width:42,
    height:42,
    alignItems:"center",
    borderRadius:21,
    backgroundColor:'#eeeeee',
    justifyContent:'center',
    marginLeft:16,
  },
  Text:{
    color:'#ffffff',
    fontSize:25,
    fontWeight:'bold',
    letterSpacing:-0.3
  }
})


const AppBar = () => {
  
  return (
    <View style={styles.Container}>
      <Text style={styles.Text}>Splay7</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.Button}  >
          <Feather name="plus" size={29} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppBar;

