import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
import Avatar from '../../../components/Avatar';
import Entypo from 'react-native-vector-icons/Entypo';
//import useTime from '../hooks/useTimeAgo'
import useTimeAgo from '../../../recursos/hooks/useTimeAgo';


 const FeedHeader=(props)=> {
    const {feed}=props;
    const timeago=useTimeAgo(feed.item.createAt);
    const AvatarUri=feed.item.idUser.avatar
    return (
        <>
        <View style={styles.Header}>
                   <View style={styles.Row}>
                       {AvatarUri !==null ? (<Avatar source={{uri:AvatarUri }}/>):(<Avatar source={require('../../../assets/icon-avatar-default.png')}/>) }
                       
                       <View style={{paddingLeft:10}}>
                           <Text style={styles.User}>{feed.item.idUser.name}</Text>
                           <View style={styles.Row}>
                               <Text style={styles.Time}>{timeago}</Text>
                           </View>
                       </View>
                   </View>
                   <Entypo name='dots-three-horizontal'size={15} color='#222121'/>
               </View>   
       </>
    )
}

export default FeedHeader;
const styles=StyleSheet.create({
    Header:{
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginTop:6,
        paddingVertical:0,
        paddingHorizontal:11,
    },
    Row:{
        alignItems:'center',
        flexDirection:'row',
    },
    User:{
        fontSize:12,
        fontWeight:'bold',
        color:'#222121',
    },
    Time:{
        fontSize:9,
        color:'#747476',
    }
})
