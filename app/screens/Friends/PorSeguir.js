import React, {useEffect, useState} from 'react';
import {
  Text,
  Button,
  View,
  ScrollView,
  FlatList,
  List,
  ListItem,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery, useMutation} from '@apollo/client';
import {GET_NOTFRIEND, FRIEND} from '../../recursos/gql/friend';
import Avatar from '../../components/Avatar';
import Feather from 'react-native-vector-icons/Feather';

const Friend = ({navigation}) => {
  const [friend] = useMutation (FRIEND);
  const {data, loading, refetch, startPolling, stopPolling} = useQuery (
    GET_NOTFRIEND
  );

  if (loading) return(
  <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
    <ActivityIndicator size="large" />
  </View>);


  const {getNotFriends} = data;
  const AgregarAmigo =  id => {
    Alert.alert (
      'Seguir',
      'Esta seguro que Quiere Seguir',
       [
           {
  text: ('Cancelar')
},
        {
              text: 'Seguir', 
              onPress: () => guardarAmigo (id)
        }
        ],
      {cancelable: false}
    );
  };

  const guardarAmigo = async id => {
    try {
      await friend ({
        variables: {
          id: id,
        },
      });
      refetch ();
    } catch (error) {
      console.log (error);
    }
  };
 
  

  return (
    <React.Fragment>
      <TouchableOpacity
        style={styles.appButtonContainer}
        color='#00A79D'
        activeOpacity={0.8}
        onPress={() => navigation.navigate ('Siguiendo')}
      >
      
        <Text style={styles.appButtonText} >Ir donde Mis Amigos</Text>
    
      </TouchableOpacity>
      <FlatList
        data={getNotFriends}
        renderItem={notFriends => (
          <React.Fragment>
            <View style={styles.Container}>
              <View style={styles.Row}>

                {notFriends.item.avatar !== null
                  ? <Avatar source={{uri: notFriends.item.avatar}} />
                  : <Avatar
                      source={require ('../../assets/icon-avatar-default.png')}
                    />}
                <View>
                  <Text style={styles.User}>{notFriends.item.name}</Text>
                  <Text style={styles.Time}>{notFriends.item.lastname}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.ButtonStyled}
                onPress={() => AgregarAmigo (notFriends.item.id)}
              >
                <Feather name="check" size={29} color="#00A79D" />
              </TouchableOpacity>

            </View>
            <View
              style={{
                height: 1,
                width: '86%',
                backgroundColor: 'black',
                marginLeft: '14%',
              }}
            />
          </React.Fragment>
        )}
        keyExtractor={notFriends => notFriends.id}
      />
    </React.Fragment>
  );
};

export default Friend;

const styles = StyleSheet.create ({
  Container: {
    width: '100%',
    height: 58,
    paddingVertical: 0,
    paddingHorizontal: 11,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  Row: {
    flexDirection: 'row',
  },
  User: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: 'bold',
    color: '#222121',
  },
  Time: {
    fontSize: 9,
    marginLeft: 10,
    color: '#747476',
  },
  ButtonStyled: {
    width: 42,
    height: 42,
    alignItems: 'center',
    borderRadius: 21,
    backgroundColor: '#919191',
    justifyContent: 'center',
    marginLeft: 16,
  },
  appButtonContainer:{
    elevation:8,
    backgroundColor:'#00a79d',
    borderRadius:10,
    paddingVertical:10,
    paddingHorizontal:12,
    marginHorizontal:10,
  },
  appButtonText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold',
    alignSelf:'center',
    textTransform:'uppercase',
  },
});

