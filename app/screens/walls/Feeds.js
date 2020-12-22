import React,{useEffect} from 'react'
import {Text,List,ListItem,FlatList,ActivityIndicator,View,ScrollView ,StyleSheet} from 'react-native';
//Query
import {useQuery} from '@apollo/client' ;
import {GET_PUBLICATIONS_FOLLOWEDS_FRIENDS} from '../../recursos/gql/publication';
//Vistas
import FeedHeader from '../../screens/walls/Feed/FeedHeader';
import FeedPost from '../../screens/walls/Feed/FeedPost';
import FeedImage from '../../screens/walls/Feed/FeedImage';
import FeedVideo from '../../screens/walls/Feed/FeedVideo';
import FeedFooter from '../../screens/walls/Feed/FeedFooter';
import FeedComment from '../../screens/walls/Feed/FeedComment';
import FeedAddComment from '../../screens/walls/Feed/FeedAddComment';
const Feeds=()=> {
    const {data,loading,startPolling,stopPolling}=useQuery(GET_PUBLICATIONS_FOLLOWEDS_FRIENDS);
    useEffect(() => {
        startPolling(1000);
        return ()=>{
            stopPolling;
        }
    }, [startPolling,stopPolling])   
    if(loading) return( 
    <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
      <ActivityIndicator size="large"/>
    </View>)
   console.log(data);
const {getPublicationsFollersFriends}=data;
    return (
        <View style={styles.Container}>
            <FlatList
                data={getPublicationsFollersFriends}
                renderItem={(feed)=>(
                <>
                    <FeedHeader feed={feed}/>
                    <FeedPost feed={feed}/>
                    {feed.item.typeFile==='image' && (<FeedImage feed={feed}/>)}
                    {feed.item.typeFile==='video'&& (<FeedVideo feed={feed}/>)}
                    <FeedFooter feed={feed}/>
                    <FeedComment feed={feed}/>
                    <FeedAddComment feed={feed}/>
                    <View style={styles.BottomDivider}/>
                </>
                )}
               keyExtractor={feed=>feed.id}
            />

        </View>
    )
}
export default Feeds;
const styles=StyleSheet.create({
    Container:{
        flex:1,
    },
    BottomDivider:{
        width:'100%',
        height:9,
        backgroundColor:'#f0f2f5',
    },
    Text:{
        fontSize:12,
        color:'#424040'
    },
})