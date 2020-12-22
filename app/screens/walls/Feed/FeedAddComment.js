import React, {useState} from 'react';
import {Button, TouchableOpacity,View,Text,TextInput,StyleSheet} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useMutation} from '@apollo/client';
import {ADD_COMMENT} from '../../../recursos/gql/comment';
const FeedAddComment = props => {
  const {feed} = props;
  const [comment, setComment] = useState ('');
  const [addComment] = useMutation (ADD_COMMENT);

  const guardarComentario = async () => {
    if (comment.length > 0) {
      try {
        const {data} = await addComment ({
          variables: {
            input: {
              idPublication: feed.item.id,
              comment: comment,
            },
          },
        });
        setComment ('');
      } catch (error) {
        console.log (error);
      }
    }
  };

  return (
    <View style={styles.Container}>
      <TextInput style={styles.TextInput}
        placeholder="Añade un comentario..."
        value={comment}
        onChangeText={texto => setComment (texto)}
      />
      
      <TouchableOpacity onPress={() => guardarComentario ()}>
        <Feather name="send" size={20} color="#ffffff" />
      </TouchableOpacity>
     
    </View>
  );
};

export default FeedAddComment;

const styles=StyleSheet.create({
    Container:{
        bottom:0,
        margin:0,
        flexDirection:'row',
        alignItems:'center',
    },
    TextInput:{
        height:35,
        width:'85%',
        padding:10,
        borderWidth:1,
        borderRadius:10,
        borderColor:'black',
        backgroundColor:'#c4e0dd',
        margin:10,
    },
    Text:{
        fontSize:12,
    },
})





