import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const YouTube=({videoId,videoReady})=> {
  
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View>
     {
      
     
      <YoutubePlayer
        height={250}
        play={playing}
        videoId={videoId}
        onReady={videoReady}
        onChangeState={onStateChange}
      />
     }
    
    </View>
  );
}
export default YouTube;