import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import jwtDecode from 'jwt-decode';
import {useQuery, useMutation} from '@apollo/client';
import {GET_FRIENDS, UN_FRIEND} from '../../recursos/gql/friend';
import Avatar from '../../components/Avatar';
import Feather from 'react-native-vector-icons/Feather';

export default function Siguiendo ({navigation}) {
  const [userid, setUserid] = useState ('');
  const [unfriend] = useMutation (UN_FRIEND);

  const llamarUsuario = async () => {
    const userToken = await AsyncStorage.getItem ('userToken');
    const Auth = jwtDecode (userToken);
    setUserid (Auth);
  };

  llamarUsuario ();

  

  const {
    data,
    loading,
    refetch,
    startPolling,
    stopPolling,
  } = useQuery (GET_FRIENDS, {
    variables: {id: userid.id},
  });

  if (loading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  const {getFriends} = data;

  const QuitarAmigo =  id => {
    Alert.alert (
      'Dejar de Seguir',
      'Esta seguro que Quiere dejar de Seguir a su Amigo',
       [
           {
  text: ('Cancelar')
},
        {
              text: 'No Seguir', 
              onPress: () => guardarAmigo (id)
        }
        ],
      {cancelable: false}
    );
  };




  const guardarAmigo = async id => {
    try {
      await unfriend ({
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
        color="#00A79D"
        activeOpacity={0.8}
        onPress={() => navigation.navigate ('Personas que no Seguimos')}
      >

        <Text style={styles.appButtonText}>Atras</Text>

      </TouchableOpacity>

      <FlatList
        data={getFriends}
        renderItem={Friends => (
          <React.Fragment>
            <View style={styles.Container}>
              <View style={styles.Row}>

                {Friends.item.avatar !== null
                  ? <Avatar source={{uri: Friends.item.avatar}} />
                  : <Avatar
                      source={require ('../../assets/icon-avatar-default.png')}
                    />}
                <View>
                  <Text style={styles.User}>{Friends.item.name}</Text>
                  <Text style={styles.Time}>{Friends.item.lastname}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.ButtonStyled}
                onPress={() => QuitarAmigo (Friends.item.id)}
              >
                <Feather name="x" size={29} color="red" />
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
}

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
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#00a79d',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 10,
  },
  appButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

