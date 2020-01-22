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
  Platform
} from "react-native";
import styled from "styled-components";
import Stars from 'react-native-stars';
import {FontAwesome, EvilIcons} from "@expo/vector-icons";
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line } from '../../../components/Color';
import { PROVIDER_GOOGLE,Marker, Callout, Circle } from "react-native-maps";
import MapView from 'react-native-map-clustering';
import Carousel from 'react-native-snap-carousel';
import { withNavigation } from "react-navigation";

class ProfileMapPresenter extends React.Component {
    
    state = {
        
        coordinate:{
            latitude:0,
            longitude:0
        }
    }
    constructor(props) {
        super(props);
        const {navigation} = props;
        const {marker, region} = props;
        this.state = {marker, region, navigation};
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
            //console.log(this.state.region);

            
        },
        error=> alert(error.message),
        {timeout:20000, maximumAge:1000}
        )
    }

    /*onMarkerPressed=(marker,index)=>{
        this._map.animateToRegion({
            latitude: marker.posts[index].storeLat,
            longitude: marker.posts[index].storeLong,
            latitudeDelta: 0.047864195044303443,
            longitudeDelta: 0.0540142817690068
        })

    }*/



    render(){
        return (
            <View style={styles.container}>
                <MapView initialRegion={this.state.region} style={{flex:1}}>
                    {
                        this.state.marker.posts.map((marker, index)=>{
                            <Marker key={index} 
                            coordinate={{latitude: marker.storeLat, longitude: marker.storeLong}}/>
                        })
                    }
                </MapView>
            
                
            </View>

        )
        
    }
}

const styles = StyleSheet.create({
    container:{
        ...StyleSheet.absoluteFillObject
    },
    map:{
        flex:1,
        ...StyleSheet.absoluteFillObject
    },
    map1:{
        flex:10,
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
    viewSub:{
        flexDirection:'row'
    },
    ratingCard:{
        color:"white",
        fontSize:14,
        alignSelf:'center',
        marginBottom:10
    
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
    },
    markerImage:{
        width:30,
        height:30,
        opacity:1,
        borderWidth:2,
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,

    }
})

AppRegistry.registerComponent("mapfocus", () => screens);
export default withNavigation(ProfileMapPresenter);

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