import { View, Text ,Button,StyleSheet} from 'react-native'
import React ,{useState}from 'react'
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoPlayer = ({videoId,setPlayStatus}) => {
  
  const [playing, setPlaying] = useState(false);
  const [isMute, setMute] = useState(true);
  const togglePlaying = () => {
    setPlaying((prev) => !prev);
    setPlayStatus((prev=>!prev));
  }
  return (
    <View >
       <YoutubePlayer
        height={220}
        width={340}
        play={playing}
        mute={isMute}
        webViewProps={{androidLayerType: 'software'}}
        overScrollMode="never"
        videoId={videoId}
        fullscreen={true}
       
      />
      
    </View>
  )
}

export default VideoPlayer;
const styles=StyleSheet.create(
  {
     VideoPlayerContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        height:300,
        backgroundColor: 'white',
        elevation: 0,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.1,
        shadowRadius: 5,
     
     }
  }
)