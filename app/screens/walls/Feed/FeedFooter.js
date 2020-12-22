import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LikeCount from './LikeCount';
import CommentCount from './CommentCount';
import FeedFooterButtonLike from './FeedFooterButtonLike';

const FeedFooter = (props) => {
    const {feed}=props;
    return (
        <>
         <View style={styles.Footer}>
                <View style={styles.FooterCount}>
                    <View style={styles.Row}>
                        <LikeCount feed={feed}/>
                    </View>
                 <CommentCount feed={feed}/>
                </View>
        <View style={styles.Separador}/>
        <View style={styles.FooterMenu}>
        <FeedFooterButtonLike feed={feed}/>
        <TouchableOpacity style={styles.Button}>
            <View style={styles.Icon}>
                <MaterialCommunityIcons
                name='comment-outline'
                size={20}
                color='#424040'
                />
            </View>
            <Text style={styles.Text}>Comentarios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button}>
            <View style={styles.Icon}>
                <MaterialCommunityIcons
                name='share-outline'
                size={20}
                color='#424040'
                />
            </View>
            <Text style={styles.Text}>Compartir</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.Separador}/>
        
    </View>    
        </>
    )
}

export default FeedFooter

const styles=StyleSheet.create({
    Footer:{
        paddingVertical:0,
        paddingHorizontal:11
    },
    FooterCount:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:9,
        paddingHorizontal:0,
    },
    Row:{
        alignItems:'center',
        flexDirection:'row',
    },
    Separador:{
        width:'100%',
        height:1,
        backgroundColor:'#f9f9f9',
    },
    FooterMenu:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:9,
        paddingHorizontal:0,
    },
    Button:{
        flexDirection:'row',
    },
    Icon:{
        marginRight:6,
    },
    Text:{
        fontSize:12,
        color:'#424040',
    },
})



