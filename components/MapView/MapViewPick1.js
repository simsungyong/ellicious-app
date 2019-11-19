import React, { Component } from "react";
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
import styled from "styled-components";

import Stars from 'react-native-stars';
import {FontAwesome, EvilIcons} from "@expo/vector-icons";
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line } from '../Color';
import MapView, { PROVIDER_GOOGLE,Marker, Callout, Circle } from "react-native-maps";
import { Platform } from "@unimodules/core";
import Carousel from 'react-native-snap-carousel';

export default class MapViewPick extends Component {
    state = {
        coordinate:{
            latitude:0,
            longitude:0
        }
    }
    constructor(props) {
        super(props);
        const {marker, region} = props;
        this.state = {marker, region};
        
    }

    componentDidMount(){
        this.locationCurrentPosition();
    }

    locationCurrentPosition=()=>{
        navigator.geolocation.getCurrentPosition(position=>{
            //this.setState({coordinate:position.coords})
            this.setState({region:{latitude:position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    ...this.state.region}})
            console.log(this.state.region);

            
        },
        error=> alert(error.message),
        {timeout:20000, maximumAge:1000}
        )
    }
    setMarkerRef=(ref)=>{
        this.setState({markers:ref}) 
    }

    onCarouselItemChange=(index)=>{
        let latitude = this.state.marker.picks[index].post.storeLat
        let longitude = this.state.marker.picks[index].post.storeLong
        this._map.animateToRegion({
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: 0.047864195044303443,
            longitudeDelta: 0.0540142817690068,
        })
        
    }

    renderCarouselItem = ({item})=>
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.post.storeName}</Text>
            <Image source={{uri:item.post.files[0].url}}
                                style={styles.cardImage, {width:130, height:130}}/>
        </View>


    render(){
        //console.log(this.state.marker.picks);
        return (
            <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map=>this._map = map}
                style={styles.map}
                showsUserLocation={true}
                initialRegion={this.state.region}
                
                >
                
                {this.state.marker.picks.map((marker, index)=>(
                    <Marker 
                    key={index} 
                    coordinate={{latitude:marker.post.storeLat, longitude:marker.post.storeLong}}
                    //ref={ref=>this.state.markers[index] = ref}//}
                    >
                        
                    <Image source={{uri:marker.post.files[0].url}}
                                style={{width:25, height:25}}/>

                    </Marker>
                ))}
                
                </MapView>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.marker.picks}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={300}
                    containerCustomStyle={styles.carousel}
                    removeClippedSubviews={false}
                    onSnapToItem={(index=>this.onCarouselItemChange(index))}
            />
                </View>

        )
        
    }
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject
    },
    map:{
        ...StyleSheet.absoluteFillObject
    },
    carousel:{
        position:'absolute',
        bottom:0,
        marginBottom:48
    },
    cardContainer:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height:200,
        width:300,
        padding: 24,
        borderRadius: 24
    
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        position:'absolute',
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24
    },
    cardTitle:{
        color:"white",
        fontSize:22,
        alignSelf:'center',
        marginBottom:10
    }
})

/*{this.state.marker.picks.map((marker, index)=>(
                    <Circle
                        key={index} center={{latitude:marker.post.storeLat, longitude:marker.post.storeLong}}
                        radius={150}
                        fillColor={'rgba(150,2000,200,0.5)'}/>))}*/

/*<Callout>
                            <Image source={{uri:marker.post.files[0].url}}
                                style={styles.cardImage, {width:50, height:50}}/>
                            <Text>{marker.post.storeName}</Text>
                        </Callout>*/