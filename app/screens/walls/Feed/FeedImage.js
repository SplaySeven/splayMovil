import React, {useState, useRef} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
} from 'react-native';

const {width} = Dimensions.get ('window');

const SIZE = width;
const FeedImage = props => {
  const {feed} = props;
  const [dialog, setDialog] = useState (false);

  return (
    <React.Fragment>
          <Image 
          style={styles.Photo} 
          source={{uri: feed.item.file}} />
      
      

    </React.Fragment>
  );
};

export default FeedImage;

const styles = StyleSheet.create ({
  Photo: {
    marginTop: 9,
    width: SIZE,
    height: SIZE,
  },
  modalContainer: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  botoncerrar: {
    marginTop: 0,
  },
});
