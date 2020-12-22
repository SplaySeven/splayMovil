import React,{useEffect} from 'react';
import {Text,StyleSheet} from 'react-native'
import {useQuery} from '@apollo/client'
import {COUNT_COMMENTS} from '../../../recursos/gql/comment';
const CommentCount = (props) => {
    const {feed}=props
    const {item}=feed
    const {data,loading,startPolling,stopPolling}=useQuery(COUNT_COMMENTS,{
        variables:{idPublication:item.id}
    })
    
    useEffect(() => {
        startPolling(1000);
        return ()=>{
            stopPolling;
        }
    }, [startPolling,stopPolling])


    if (loading) return null
    const {countComments}=data
    return (
        <>
         <Text style={{fontSize:11,color:'#424040'}}>{countComments} comentario</Text>   
        </>
    )
}
export default CommentCount

