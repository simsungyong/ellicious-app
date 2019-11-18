import React, {useState, useEffect} from 'react';
import MapView,{Marker, PROVIDER_GOOGLE, Callout, Polygon} from 'react-native-maps';
import { StyleSheet,Image, Text, View, Dimensions, TextBase } from 'react-native';
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../Loader';
import {CATEGORYINFO_FRAGMENT} from '../../fragments';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height/2,
    },
});
const INITIAL_MARKER = [
    {
        id:1,
        region:{latitude:37.62572129999999, longitude:127.0653296 },
        title: '땅코',
        desc: 'ㄹㄹㄹㄹㄹㄹㄹ'
    },
    {
        id:2,
        region:{latitude:37.6563426, longitude:127.0781567 },
        title: '왕짜장',
        desc: 'ㄹㄹㄹㄹㄹddㄹㄹ',
    },
    {
        id:3,
        region:{latitude:37.6274535, longitude:127.0781088 },
        title: '몰라몰라',
        desc: 'ㄹㄹㄹㄹㄹㄹㄹ',
    },
]

const initialState = {
    latitude: 37.630069700,
    longitude: 127.0760193,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
}

const GET_CATEGORYINFO = gql`
  {
    seeCategory {
        ...CategoryInfo
    }
  } ${CATEGORYINFO_FRAGMENT}
`;


export default MapViews = () => {
    let myMap;
    let a;
    const { loading, data } = useQuery(GET_CATEGORYINFO);

    {loading ? <Loader/> : console.log(data.seeCategory);}
    const [currentPosition, setCurrentPosition] = useState(initialState);
    /*useEffect(()=>{
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
    },[]);*/

    const renderMarker = () =>{
        return INITIAL_MARKER.map(_marker=>(            
            <Marker
            //draggable
             key={_marker.id}
             coordinate={_marker['region']}
             pinColor={'#000000'}
             title={_marker.title}
             description={_marker['desc']}
             onPress={()=>console.log(_marker['region'])}
                 /*myMap.fitToCoordinates([_marker['region']],{
                     edgePadding:{top:10, bottom:10, left:10, right:10},
                     //animated:true
                 })
                }}*/>
                    
                </Marker>
            
        ));
    }
    

    return currentPosition.latitude ? (
        <View style={styles.container}>
          <MapView 
            ref={ref=>myMap = ref}
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={currentPosition}
            //onRegionChange={setCurrentPosition}
            showsUserLocation
             >
        
            {renderMarker()}
            
        </MapView>
        </View>
    ): <Loader/>;
}

/* <Polygon coordinates={INITIAL_MARKER.region}
fillColor={'rgba(100,200,200,0.3)'}*/
/*showWelcomeMessage=()=>{
    Alert.alert(
        "Welcome to fafaf",
        [{
            text:"Cancel",
            style:"cancel"
        },
        {
            text:"OK"
        }]
    )
}*/