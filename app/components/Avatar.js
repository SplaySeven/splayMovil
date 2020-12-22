import React from 'react';
import {View,StyleSheet,Image} from 'react-native'


const Avatar = ({source, online}) => {
  return (
    <View style={styles.Container}>
      <Image style={styles.user} source={source} />
      {online && <View style={styles.userActive} />}
    </View>
  );
};

export default Avatar;

const styles=StyleSheet.create({
    Container:{
        width:40,
        height:40,
        position:'relative'
    },
    user:{
        width:40,
        height:40,
        borderRadius:20,
    },
    userActive:{
        width:15,
        height:15,
        borderRadius:8,
        backgroundColor:'#4bcb1f',
        position:'absolute',
        bottom:-2,
        right:-2,
        borderWidth:2,
        borderColor:'#ffffff',
    }
})
