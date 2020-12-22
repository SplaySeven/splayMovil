import {useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import {RNS3} from 'react-native-aws3';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {GET_PUBLICATIONS_FOLLOWEDS_FRIENDS, PUBLISHMOVIL} from '../../recursos/gql/publication';

const uuid = require ('react-native-uuid');

const DismissKeyboard = ({children}) => {
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss ()}>
    {children}
  </TouchableWithoutFeedback>;
};
const Publication = ({navigation}) => {
  const [image, setImage] = useState (null);
  const [fileUpload, setFileUpload] = useState (null);
  const [comentarios, setComentarios] = useState ('');
  const [cargando, setCargando] = useState (false);
  const [publishMovil] = useMutation (PUBLISHMOVIL,{
      update(cache,{data:{publishMovil}}){
          const {getPublicationsFollersFriends}=cache.readQuery({query:GET_PUBLICATIONS_FOLLOWEDS_FRIENDS})
          cache.writeQuery({
              query:GET_PUBLICATIONS_FOLLOWEDS_FRIENDS,
              data:{
                  getPublicationsFollersFriends:[...getPublicationsFollersFriends,publishMovil]
              }
          })
      }
  });


  const takePhotoFromCamera = () => {
    setFileUpload (null);
    ImagePicker.openCamera ({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then (image => {
      const mimetype = image.mime;
      const extension = mimetype.split ('/')[1];
      const filename = `${uuid.v4 ()}.${extension}`;
      setFileUpload ({
        uri: image.sourceURL,
        name: filename,
        type: image.mime,
      });

      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage (image.path);
    });
  };
  const choosePhotoFromLibrary = () => {
    setFileUpload (null);
    ImagePicker.clean ();
    ImagePicker.openPicker ({
      mediaType: 'photo',
      width: 1200,
      height: 780,
      cropping: true,
      compressImageQuality: 0.7,
    }).then (image => {
      const mimetype = image.mime;
      const extension = mimetype.split ('/')[1];
      const filename = `${uuid.v4 ()}.${extension}`;
      setFileUpload ({
        uri: image.sourceURL,
        name: filename,
        type: image.mime,
      });
      setCargando (false);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage (image.path);
    });
  };
  const chooseVideoFromLibrary = () => {
    setFileUpload (null);
    ImagePicker.clean ();
    ImagePicker.openPicker ({
      mediaType: 'video',
      width: 1200,
      height: 780,
      cropping: true,
    }).then (image => {
      const mimetype = image.mime;
      const extension = mimetype.split ('/')[1];
      const filename = `${uuid.v4 ()}.${extension}`;
      setFileUpload ({
        uri: image.sourceURL,
        name: filename,
        type: image.mime,
      });
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage (image.path);
    });
  };

  const onPublish = () => {
    setCargando (true);
    const config = {
      keyPrefix: 'publication/',
      bucket: 'splayseven',
      region: 'us-east-2',
      accessKey: 'AKIAUZDNW43KSAG2AUMU',
      secretKey: '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',
      successActionStatus: 201,
    };
    RNS3.put (fileUpload, config).then (response => {
      const file = {
        amazon: response.headers.Location,
        type: fileUpload.type,
      };
      try {
        (async function () {
          const result = await publishMovil ({
            variables: {
              file,
              comments: comentarios,
            },
          });
          setCargando (false);
          Alert.alert ('Publicacion', 'Publicacion Exitosa');
          setImage (null);
          setComentarios ('');
          navigation.navigate ('Wall');
        }) ();
      } catch (error) {
        console.log (error);
        Alert.alert ('Error ', 'Error al subir Publicacion');
      }
    });
  };
  if (cargando)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" />
        <Text
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            fontWeight: 'bold',
            fontSize: 15,
          }}
        >
          Cargado Publicación ..
        </Text>
      </View>
    );
  return (
    <View style={styles.Container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss ()}>
        <View style={styles.InputWrapper}>
          {image != null
            ? <Image style={styles.AddImage} source={{uri: image}} />
            : null}
          <TextInput
            style={styles.InputFileds}
            placeholder="¿Sobre qué quieres hablar?"
            multiline
            numberOfLines={4}
            value={comentarios}
            onChangeText={texto => setComentarios (texto)}
          />
          {image != null
            ? <TouchableOpacity style={styles.SubmitBtn} onPress={onPublish}>
                <Text style={styles.SubmitBtnText}>Publicar</Text>
              </TouchableOpacity>
            : null}
        </View>
      </TouchableWithoutFeedback>
      <ActionButton buttonColor="rgba(231,76,60,1)">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Tomar Photo"
          onPress={takePhotoFromCamera}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Escoger Photo"
          onPress={choosePhotoFromLibrary}
        >
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#1abc9c"
          title="Escoger Video"
          onPress={chooseVideoFromLibrary}
        >
          <Icon name="videocam-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>

    </View>
  );
};

export default Publication;
const styles = StyleSheet.create ({
  Container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  InputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  InputFileds: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: 24,
    width: '90%',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  AddImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  SubmitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e515',
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  SubmitBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e64e5',
  },
});
