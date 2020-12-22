import React from 'react';
import {Text,StyleSheet} from 'react-native'
const FeedPost = (props) => {
    const {feed}=props
    return (
        <>
         <Text style={styles.Post}>{feed.item.comments}</Text>   
        </>
    )
}

export default FeedPost


const styles=StyleSheet.create({
    Post:{
        fontSize:12,
        color:'#222121',
        lineHeight:16,
        paddingVertical:0,
        paddingHorizontal:11,
    },
})