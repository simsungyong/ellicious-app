import React, { Component,useState ,useEffect} from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
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
import MapViewContainer from '../../components/MapView/MapViewPick';
import Loader from "../../components/Loader";

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





const region = {  
  latitude: 37.6247855,
  longitude: 127.0773206,
  latitudeDelta: 0.047864195044303443,
  longitudeDelta: 0.0540142817690068,
};

const PICK_ITEM = gql`
  {
    me {
      picks {
          post {
            id
            storeLat
            storeLong
            storeName
            rating
            storeLocation
            files{
              url
              id
            }
          }
      }
    }
  }
`;

const MyPick=({navigation})=>{
  const { loading, data } = useQuery(PICK_ITEM);
  
  //const [marker, setMarker] = useState(data.me);
  
  /*const [currentPosition, setCurrentPosition] = useState(region);
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(position=>{
            const {longitude, latitude} = position.coords;
            setCurrentPosition({
                ...currentPosition,
                latitude,
                longitude
            })
        },
        error=> alert(error.message),
        {timeout:20000, maximumAge:1000}
        )
    },[]);
  //console.log(data);
  
  const handle=async(index)=>{
    await setMarker(markers[index]);
  }*/

  return(
    <View style={styles.container}>
      {loading ? <Loader/> : <MapViewContainer navigation={navigation} marker={data.me} region={region}/>}
    </View>
  )
}


export default MyPick;

/*<View style={styles.container1}>
            {markers.map((marker, index)=>(
              <View style={styles.button} key={index}>
                  <TouchableOpacity onPress={handle(index)}>
                  <Text>{marker.categoryname}</Text>
                  </TouchableOpacity>
                </View>
            ))}
        </View>*/

        