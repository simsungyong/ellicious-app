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
import MapViewPick from '../../components/MapView/MapViewPick';
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
  //const [isLoading, setLoading] = useState(false);
  //const [qRefresh, setQRefresh] = useState(0)
  const { loading, data, error } = useQuery(PICK_ITEM);
  const [marker,setData] = useState('');
  if(!loading){
    console.log(data)
    console.log(loading)
  }
  
  return(
    <View style={styles.container}>
       {loading ? <Loader/> : <MapViewPick navigation={navigation} marker={data.me} region={region}/>}
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

//     
