import React, {useState, useEffect} from 'react';
import MapView,{Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Loader from '../Loader';

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

const initialState = {
    latitude: 37.630069700,
    longitude: 127.0760193,
    latitudeDelta:0.0922,
    longitudeDelta:0.0421,
}

const MapViews = () => {
    const [currentPosition, setCurrentPosition] = useState(initialState);
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

    return currentPosition.latitude ? (
        <View style={styles.container}>
          <MapView 
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            initialRegion={initialState}
            showsUserLocation
             >
            <Marker
             coordinate={{
                "latitude" : 37.63006970000001,
                "longitude" : 127.076019
            }}
             title={"교촌치킨 서울과기대점"}
             description={"교촌 레드콤보 존맛탱"}/> 
        </MapView>
        </View>
    ): <Loader/>;
}

export default MapViews