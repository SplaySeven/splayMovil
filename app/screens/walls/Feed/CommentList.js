import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import useTimeAgo from '../../../recursos/hooks/useTimeAgo';
import Avatar from '../../../components/Avatar';

const CommentList = props => {
  const {getComment} = props;
  const timeago = useTimeAgo (getComment.item.createAt);

  return (
    <View style={styles.Container}>
      <View style={styles.Row}>

        <Avatar source={{uri: getComment.item.idUser.avatar}} />
        <View style={styles.View} >
          <Text style={styles.User}>{getComment.item.idUser.name}</Text>

          <View style={styles.Row}>
            <Text style={styles.Text}>{getComment.item.comment}</Text>

          </View>
          <Text style={styles.Time}>{timeago}</Text>
        </View>

      </View>

    </View>
  );
};

export default CommentList;

const styles=StyleSheet.create({
    View:{
        padding:10,
        borderRadius:18,
        borderWidth:1,
        borderColor:'#3a3b3c',
        marginLeft:2,
        marginRight:10,
        textAlign:'left',
        backgroundColor:'#f6f8fa',
        marginBottom:5,
    },
    Container:{
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
    Text:{
        fontSize:12,
        color:'#424040',
    },
    User:{
        fontSize:12,
        fontWeight:'bold',
        color:'#222121',
    },
    Time:{
        fontSize:9,
        color:'#747476',
    },
})



