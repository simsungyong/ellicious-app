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

export default class MapViewPick extends React.Component {
    
    state = {
        //translateYValue: new Animated.Value(value),
        //markers:[],
        coordinate:{
            latitude:0,
            longitude:0
        }
    }
    constructor(props) {
        super(props);
        
        const {marker, region,navigation} = props;
        this.state = {marker, region,navigation};
    }

    componentWillMount() {
        this.index = 0;
        this.animation = new Animated.Value(0);
      }

    componentDidMount(){
        this.locationCurrentPosition();
        this.animation.addListener(({ value }) => {
            
            let index = Math.floor(value / 300 + 0.3);
             // animate 30% away from landing on the next item
            if (index >= this.state.marker.length) {
              index = this.state.marker.length - 1;
            }
            if (index <= 0) {
              index = 0;
            }

            clearTimeout(this.regionTimeout);
      this.regionTimeout = setTimeout(() => {
        if (this.index !== index) {
          this.index = index;
          this.setState({coordinate:{latitude:this.state.marker[index].post.storeLat, longitude:this.state.marker[index].post.storeLong}})
          
        }
      }, 10);
      
      });
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

   onCarouselItemChange=(index)=>{
        let latitude = this.state.marker[index].post.storeLat
        let longitude = this.state.marker[index].post.storeLong
        this._map.animateToRegion({
            latitude:latitude,
            longitude:longitude,
            latitudeDelta: 0.011864195044303443,
            longitudeDelta: 0.0100142817690068,
        })
        
    }
    
    /*onMarkerPressed=(index)=>{
        this._map.animateToRegion({
            latitude: this.state.marker.picks[index].post.storeLat,
            longitude: this.state.marker.picks[index].post.storeLong,
            latitudeDelta: 0.047864195044303443,
            longitudeDelta: 0.0540142817690068
        })

        this._carousel.snapToItem(index);
    }*/

    
    renderCarouselItem = ({item})=>(
        <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>{item.post.storeName}</Text>
            <View style={styles.viewSub}>
              <View style={styles.imageCon}>
                    <Image source={{uri:item.post.files[0].url}}
                          style={styles.cardImage, {width:130, height:130, borderRadius:10}}
                          />
              </View>
              <View style={styles.viewDetailContiner}>

                <View style={styles.viewSubDetail}>
                  <Image 
                    style={{height: 40, width: 40, borderRadius:19}}
                    source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
                    <Text style={styles.cardUsername}>{item.post.user.username}</Text>
                </View>
                <View style={styles.viewSubRating}>
                      <FontAwesome
                      color={StarColor}
                      size={25}
                      name={"star"}
                    />
                    <FontAwesome
                      color={StarColor}
                      size={25}
                      name={"star"}
                    />
                    <FontAwesome
                      color={StarColor}
                      size={25}
                      name={"star"}
                    />
                    <FontAwesome
                      color={StarColor}
                      size={25}
                      name={"star-o"}
                    />
                      </View>
              </View>
            </View>
            
        </View>
    )

    render(){
        
        const interpolations = this.state.marker.map((marker, index) => {
            const inputRange = [
              (index - 1) * 300,
              index * 300,
              ((index + 1) * 300),
            ];
            const opacity = this.animation.interpolate({
              inputRange,
              outputRange: [0.45, 1, 0.45],
              extrapolate: "clamp",
            });
            return { opacity };
          });



        return (
            <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={map=>this._map = map}
                style={styles.map}
                showsUserLocation={true}
                initialRegion={this.state.region}>
                
                {this.state.marker.map((marker, index)=>
                    {
                      const opacityStyle = {
                        opacity: interpolations[index].opacity,
                      };
                    return( 
                        <Marker 
                        key={index}
                        onPress={()=> this.state.navigation.navigate("Detail",{id:marker.post.id})}
                        coordinate={{latitude:marker.post.storeLat, longitude:marker.post.storeLong}}
                        //ref={ref=>this.state.markers[index] = ref}
                        >
                        <Animated.View style={opacityStyle}>
                            <Image source={{uri:marker.post.files[0].url}}
                                    style={styles.markerImage}/>
                        </Animated.View>
                        </Marker> )
                        })}
                    
                </MapView>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.marker}
                    renderItem={this.renderCarouselItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={300}
                    containerCustomStyle={styles.carousel}
                    removeClippedSubviews={false}
                    onSnapToItem={(index=>this.onCarouselItemChange(index))}
                    onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                x: this.animation,
                              },
                            },
                          },
                        ],
                        { useNativeDriver: true }
                      )}
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
    imageCon:{
      marginRight: 14
    },
    viewSub:{
        flexDirection:'row'
    },
    viewDetailContiner:{
      alignItems: "center",
      //justifyContent: "center"
    },
    viewSubDetail:{
      flexDirection:'row',
      marginBottom:30
  },
    viewSubRating:{
      flexDirection:'row',
      alignItems: "center",
      justifyContent: "center"
    },
    markerWrap: {
    alignItems: "center",
    justifyContent: "center",
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
    cardUsername:{
      color:"white",
      fontSize:18,
      alignSelf:'center',
      marginBottom:10
  },
    ring: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: "rgba(130,4,150, 0.3)",
        position: "absolute",
        borderWidth: 1,
        borderColor: "rgba(130,4,150, 0.5)",
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