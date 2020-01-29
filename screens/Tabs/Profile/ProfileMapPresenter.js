import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Animated,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Button,
  Platform
} from "react-native";
import styled from "styled-components";
import Stars from 'react-native-stars';
import {FontAwesome, EvilIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import { TINT_COLOR,IconColor, PointPink, BG_COLOR, StarColor, LightGrey, mainPink, Grey, Line , LightPink} from '../../../components/Color';
import { PROVIDER_GOOGLE,Marker, Callout, Circle } from "react-native-maps";
import MapView from 'react-native-map-clustering';
import Modal, {ModalTitle, ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import { withNavigation } from "react-navigation";

const Container = styled.View`
padding : 10px;
background-color : 'rgba(0,0,0,0.6)'
border-radius : 24;

`;
const ModalContainer =styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;  
  padding : 5px;
`;


class ProfileMapPresenter extends React.Component {
    
    constructor(props) {
        super(props);
        const {navigation} = props;
        const {marker, region} = props;
        this.state = {marker, region, navigation, isClick:false, indexNum:-1};
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

    animate(coordinate){
        //console.log("로그"+this.mapView.state)
        let newRegion = {
             latitude: coordinate.storeLat,
             longitude: coordinate.storeLong,
             
             latitudeDelta: this.state.region.latitudeDelta/2,
             longitudeDelta: this.state.region.longitudeDelta/2,
         };
         mapView.animateToRegion(newRegion,2000);
     }

     clickMarker(coordinate, index){
        let newRegion = {
            latitude: coordinate.storeLat,
            longitude: coordinate.storeLong,
            latitudeDelta: this.state.region.latitudeDelta/20,
            longitudeDelta: this.state.region.longitudeDelta/20,
        };

         this.setState({indexNum:index, isClick:true})
         mapView.animateToRegion(newRegion,2000);
     }
    
    



    render(){
        return (
            <View style={styles.container}>
                <MapView
                mapRef={(ref)=>mapView=ref}
                initialRegion={{latitude: 36.519959, longitude:127.889604,
                                latitudeDelta: 3, longitudeDelta:3}}
                style={{flex:1}} 
                showsUserLocation={true}>
                    {this.state.marker.posts.map((p,index)=>{
                        return(
                            <Marker key={index}
                            coordinate = {{latitude: p.storeLat, longitude: p.storeLong}}
                            onPress={()=>this.clickMarker(p,index)}

                            //onPress={()=>{this.setState({isClick:true})}}
                            >
                            <View style={styles.ratingBox}>
                                <MaterialCommunityIcons
                                        name={"map-marker-outline"}
                                        size={34}
                                        color={PointPink}/>
                            
                                <View style={styles.viewSubRating}>
                                    <Stars
                                        default={p.rating}
                                        count={5}
                                        disabled={true}
                                        half={true}
                                        fullStar={<FontAwesome
                                            color={PointPink}
                                            size={10}
                                            name={"star"}
                                        />}
                                        emptyStar={<FontAwesome
                                            color={PointPink}
                                            size={10}
                                            name={"star-o"}
                                        />}
                                        halfStar={<FontAwesome
                                            color={PointPink}
                                            size={10}
                                            name={"star-half-empty"}
                                        />}
                                        />
                                        </View>
                                    </View>
                                    
                            </Marker>
                            
  
                        )
                    })}
                    </MapView>
                    {this.state.indexNum >-1 ? (
                    <Modal.BottomModal
                        visible={this.state.isClick}
                        onTouchOutside={() =>this.setState({isClick:false})}
                        width={0.1}
                        height={170}
                        onSwipeOut={() => this.setState({isClick:false})}
                    >   
                        <ModalTitle
                        title={this.state.marker.posts[this.state.indexNum].storeName}
                        />
                        <ModalContent>
                        <Image source={{uri:this.state.marker.posts[this.state.indexNum].files[0].url}}
                          style={styles.cardImage, {width:80, height:80, borderRadius:10}}
                          />
                        </ModalContent>
                        
                    </Modal.BottomModal>
                    ): null }
                    
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
    ratingBox:{
        alignItems: "center",
        justifyContent: "center"
    
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        color:"red",
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
    viewSubRating:{
        flexDirection:'row',
        alignItems: "center",
        justifyContent: "center"
      },
    markerImage:{
        width:32,
        height:32,
        opacity:1,
        borderWidth:2,
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        borderTopLeftRadius:15,
        borderTopRightRadius:15,

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