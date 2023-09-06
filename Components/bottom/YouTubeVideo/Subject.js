import { View, Text ,ScrollView,StyleSheet} from 'react-native'
import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import VideoList from './VideoList'
import { create } from 'react-test-renderer'
import AcitvityHandler from '../AcitvityHandler'
import { Dimensions } from 'react-native'
import { COLORS } from '../../Utils/Colors/Colors'
import NoData from '../../NoData'
import Loader from '../../Loader'
const {width,height}=Dimensions.get('screen')
import { AuthContext } from '../../Context/Context'

function extractPlaylistId(url) {
  const playlistRegex = /list=([a-zA-Z0-9_-]+)/;
  const match = url.match(playlistRegex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}
const getVideoId=(video_url)=>
{
  const pattern = /(?:\?v=|\/embed\/|\/\d{2}\/|\/embed\/|\.be\/|\/v\/|http:\/\/youtu.be\/)([^#\&\?]{11})/;

// Extract the video ID using the pattern
const matches = video_url.match(pattern);

// Check if a match is found and retrieve the video ID
if (matches && matches.length > 1) {
  const videoId = matches[1];
 // Output: uzldSDFrCC8
  return videoId;
}
return null;

}
const  isPlaylistLink=(url) =>{
  const playlistRegex = /youtube\.com\/playlist/i;
  return playlistRegex.test(url);
}

const videoUrl = "https://www.youtube.com/watch?v=IaCVUKEJ3Lc&list=PL1234567890";
const playlistId = extractPlaylistId(videoUrl);

const Biology = ({navigation,route}) => {
   
    const {subject_name,video_url}=route.params;
   
   
   
    const [videoList, setVideoList] = useState(null);
    const [video,setVideo]=useState(null);
    const [showActivity, setShowActitvity] = useState(false);
    const [url, setUrl] = useState("");
    const { userToken } = useContext(AuthContext);


    const getVideoList = () => {
        setShowActitvity(true);
        const options = {
          method: 'GET',
          url: 'https://youtube-v31.p.rapidapi.com/playlistItems',
          params: {
            playlistId:extractPlaylistId(video_url),
            part: 'snippet',
            maxResults: '50'
          },
          
          headers: {
            'X-RapidAPI-Key': '5e3f97fa53msh82d042b85e64364p14f4adjsn766a04c950c7',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
           
          },
         
        };
    
        axios.request(options).then(function (response) {
         
          setVideoList(response.data.items);
          setShowActitvity(false);
        }).catch(function (error) {
          console.log(83,error);
        });
      }
    
      const getvideo=async()=>
      {
       

        setShowActitvity(true);
        const options = {
          method: 'GET',
          url: 'https://youtube-v311.p.rapidapi.com/videos/',
          params: {
            part: 'snippet,contentDetails,statistics',
            id: getVideoId(video_url),
            maxResults: '5'
          },
          headers: {
            'X-RapidAPI-Key': '5e3f97fa53msh82d042b85e64364p14f4adjsn766a04c950c7',
            'X-RapidAPI-Host': 'youtube-v311.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
        
         


          setVideo(response.data.items[0]);
        
          setShowActitvity(false);
        } catch (error) {
          console.log(error);
          setShowActitvity(false);
        }

      }
      useEffect(() => {
         if(!isPlaylistLink(video_url))
       getvideo();
       else getVideoList();
      
    
      }, []);
    // useEffect(() => {
    //     navigation.setOptions({ title:subject_name,
    //         headerTintColor: 'white',
    //         headerStyle: { backgroundColor: '#1377c0' },
    //        })
    //        getVideoList();
        
    // }, []);
    
  return (
    <ScrollView style={styles.ViewContainer} overScrollMode='never'>
       <View style={styles.header}>
         <Text style={styles.headerText}>{subject_name}</Text>
      </View>
        <View style={styles.videoContainer}>
        {
          isPlaylistLink(video_url) && (  showActivity ? <Loader x={100} show={showActivity}/>
          :( videoList?.length>0  && isPlaylistLink(video_url) ? videoList?.map((item) =>
          (
            <VideoList key={item.id} title={item.snippet.title} image={item.snippet.thumbnails.medium.url} height={item.snippet.thumbnails.medium.height}
              width={item.snippet.thumbnails.medium.width} videoId={item.snippet.resourceId.videoId}
            />
          )) :<NoData message={"No Subject Videos"}/>
          ))
        }
        {
         !isPlaylistLink(video_url) && (  showActivity ? <Loader x={100} show={showActivity}/> :
         (
          video!=null ? <VideoList  title={video?.snippet.title} image={video?.snippet.thumbnails.medium.url} height={video?.snippet.thumbnails.medium.height}
          width={video?.snippet.thumbnails.medium.width} videoId={video?.id}
        /> : <NoData message={"No Subject videos"}/>
         ))
  
        }
        
        </View>
       
    </ScrollView>
  )
}

export default Biology;
const styles=StyleSheet.create({
     videoContainer:{
        height:"100%",
        minHeight:height,
        width:"100%",
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        rowGap:20,
        marginTop:5,
        backgroundColor:"red",
        paddingTop:0,
        backgroundColor:COLORS.backgGroundColor,
     },
     ViewContainer:{
      height:700,
      width:"100%",
      padding:5,
      rowGap:20,
    
     
    
   
}, header:{
  width:"100%",
  height:40,
 
  flex:1,
  paddingLeft:10,
  justifyContent:"center",
  backgroundColor:COLORS.backgGroundColor,
 
},
headerText:{
   fontSize:20,
   fontWeight:500,
   color:"black"
}

})