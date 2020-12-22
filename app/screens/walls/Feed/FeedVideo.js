import React from 'react'
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import { View, Text } from 'react-native'

const FeedVideo = (props) => {
    const {feed}=props;
    return (
        <>
         <VideoPlayer
         controls
         paused
         source={{uri:feed.item.file}}
         style={{flex:1,marginTop:9,
         width:'100%',
         height:300}}
         />
        </>
    )
}

export default FeedVideo
