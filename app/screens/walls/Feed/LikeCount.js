import React,{useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'

import AntDesign from 'react-native-vector-icons/AntDesign';
import {useQuery} from '@apollo/client';
import {COUNT_LIKES,IS_LIKE} from '../../../recursos/gql/like';
const LikeCount = (props) => {
    const {feed}=props;
    const {item}=feed;
    const {data,loading,startPolling,stopPolling}=useQuery(COUNT_LIKES,{
        variables:{idPublication:item.id}
    });
    
    useEffect(() => {
        startPolling(1000);
        return ()=>{
            stopPolling;
        }
    }, [startPolling,stopPolling]);
    if(loading) return null;
    const {countLikes} = data;
    return (
        <>
         <View style={styles.IconCount}>
                            <AntDesign 
                                name='like1'
                                size={12}
                                color='#ffffff'/>
                        </View>
                        <Text style={styles.TextCount}>
                            {countLikes} 
                        </Text>   
        </>
    )
}

export default LikeCount

const styles=StyleSheet.create({
    IconCount:{
        backgroundColor:'#1878f3',
        width:20,
        height:20,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginRight:6,
    },
    TextCount:{
        fontSize:11,
        color:'#424040',
    },

})





