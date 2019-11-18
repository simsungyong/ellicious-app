import React, { Component,useState } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
} from "react-native";
import MapView from "react-native-maps";
import MapViewContainer from '../../components/MapView/MapViewContainer';

const styles = StyleSheet.create({
  container: {
    flex: 10,
},
  button: {
  width: 20,
  height: 20,
  borderRadius: 10,
  backgroundColor: "rgba(120,3,150, 0.9)",
},
})


const Images = [
  { uri: "https://i.imgur.com/sNam9iJ.jpg" },
  { uri: "https://i.imgur.com/N7rlQYt.jpg" },
  { uri: "https://i.imgur.com/UDrH0wm.jpg" },
  { uri: "https://i.imgur.com/Ka8kNST.jpg" }
]

const markers = [
  {
    categoryname:"소고기 맛집",
    posts: [
      {
        coordinate: {
          latitude: 37.6563426,
          longitude: 127.0653296,
        },
        title: "땅코 노원점",
        description: "This is the best place in Portland",
        image: Images[0],
  }]
},{
    categoryname:"공릉 맛집",
    posts: [
      {
        coordinate: {
          latitude: 37.62657899999999,
          longitude: 127.0748458,
        },
        title: "더 줌 공릉점",
        description: "This is the second best place in Portland",
        image: Images[1],
      },
      {
        coordinate: {
          latitude: 37.6521372,
          longitude: 127.0771796,
        },
        title: "원조쌈밥집",
        description: "This is the third best place in Portland",
        image: Images[2],
      }
    ]
  },
]

const region = {  
  latitude: 37.6247855,
  longitude: 127.0773206,
  latitudeDelta: 0.067864195044303443,
  longitudeDelta: 0.07140142817690068,
};


const MyPick=()=>{

  const [marker, setMarker] = useState(markers[1]);

  const handle=async(index)=>{
    await setMarker(markers[index]);
  }

  return(
    <View style={styles.container}>
      <MapViewContainer marker={marker} region={region}/>
      <View style={styles.container1}>
            {markers.map((marker, index)=>(
              <View style={styles.button} key={index}>
                  <TouchableOpacity onPress={handle(index)}>
                  <Text>{marker.categoryname}</Text>
                  </TouchableOpacity>
                </View>
            ))}
        </View>
    </View>
  )
}


export default MyPick;