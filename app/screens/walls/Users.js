import React from 'react'

import {ScrollView ,View,StyleSheet,TouchableOpacity} from 'react-native';
import Avatar from '../../components/Avatar';

const styles=StyleSheet.create({
    Container:{
        width:'100%',
        height:58,
        flexDirection:'row',
        alignItems:'center',
    },
    Room:{
        width:115,
        height:40,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20,
        borderWidth:1,
        borderColor:'#82b1ff',
        paddingVertical:0,
        paddingHorizontal:15,
        marginRight:12,
    },
    User:{
        marginRight:13,
    },
    BottomDivider:{
        width:'100%',
        height:9,
        backgroundColor:'#f0f2f5'
    }

})


const Users = () => {
    return (
        <>
        <View style={styles.Container}>
            <ScrollView
            horizontal
            showsHorizontalScrollIndicator
            style={{paddingLeft:11}}
            >
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            <View style={styles.User}>
                <Avatar
                source={require('../../assets/e2d418af-becd-4794-9423-8ff1be542177.jpeg')}
                online={true}
                />
            </View>
            </ScrollView>
        </View>
        <View style={styles.BottomDivider}/>
        </>
    )
}

export default Users