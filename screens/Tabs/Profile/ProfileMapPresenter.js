import React from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    
    TouchableOpacity,
    Button,
    Platform
} from "react-native";
import styled from "styled-components";
import Stars from 'react-native-stars';
import { Entypo } from "@expo/vector-icons";
import {  StarColor, Yellow, mainPink, LightGrey } from '../../../components/Color';
import { PROVIDER_GOOGLE, Marker, Callout, Circle } from "react-native-maps";
import MapView from 'react-native-map-clustering';
import Modal, { ModalTitle, ModalFooter, ModalButton } from 'react-native-modals';
import { withNavigation, ScrollView } from "react-navigation";
import Star from '../../../components/Star';


const Container = styled.View`
padding : 10px;
background-color : 'rgba(0,0,0,0.6)'
border-radius : 24;
`;
const ModalContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  align-items: center; 
flex : 1;
margin-left : 5px;
`;

const SubContainer = styled.View`
  padding: 5px;
  flex : 1;
  margin-left : 5px;
`;
const Info = styled.View`
margin-top : 2px;
`;

const ModalContent = styled.View`
flex:1;
justifyContent: center;
alignItems: center;
`;

const Title = styled.View`
justifyContent: center;
alignItems: flex-start;

`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 20px;
  margin-right : 5px;
`;

const DetailView = styled.View`
alignItems: center;
  justifyContent: center;
  borderRadius: 7;
  padding : 5px;
  margin : 4px;
  background-color: ${LightGrey};
`;

class ProfileMapPresenter extends React.Component {

    constructor(props) {
        super(props);
        const { navigation } = props;
        const { marker, region } = props;
        this.state = { marker, region, navigation, isClick: false, indexNum: -1, cateIndex: marker.posts.length==0 ? -1 : 0 };
        
    }
    

    
    

  
    componentDidMount() {
        this.locationCurrentPosition();
    }

    locationCurrentPosition = () => {

        navigator.geolocation.getCurrentPosition(position => {
            this.setState({
                region: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    ...this.state.region
                }
            })


        },
            error => alert(error.message),
            { timeout: 20000, maximumAge: 1000 }
        )
    }

    animate(coordinate) {
        let newRegion = {
            latitude: coordinate.storeLat,
            longitude: coordinate.storeLong,

            latitudeDelta: this.state.region.latitudeDelta / 20,
            longitudeDelta: this.state.region.longitudeDelta / 20,
        };
        mapView.animateToRegion(newRegion, 2000);
    }

    clickMarker(coordinate, index) {
        let newRegion = {
            latitude: coordinate.storeLat,
            longitude: coordinate.storeLong,
            latitudeDelta: this.state.region.latitudeDelta / 20,
            longitudeDelta: this.state.region.longitudeDelta / 20,
        };

        this.setState({ indexNum: index, isClick: true })
        mapView.animateToRegion(newRegion, 1000);
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    mapRef={(ref) => mapView = ref}
                    clusterColor={mainPink}
                    initialRegion={{
                        latitude: this.state.cateIndex !== -1 ? this.state.marker.posts[0].storeLat < 35.709381 ? this.state.marker.posts[0].storeLat : 35.709381 : 35.709381, 
                        // this.state.marker.posts  &&  this.state.marker.posts[0].storeLat < 35.709381) ? this.state.marker.posts[0].storeLat : 35.709381,
                        longitude: this.state.indexNum !== -1 ? this.state.marker.posts[0].storeLat < 35.709381 ? this.state.marker.posts[0].storeLong : 127.885622 :127.885622,
                        // (this.state.marker.posts && this.state.marker.posts[0] &&  this.state.marker.posts[0].storeLat < 35.709381) ? this.state.marker.posts[0].storeLong : 127.885622,
                        latitudeDelta: 7, longitudeDelta: 7
                        
                    }}
                    style={{ flex: 1 }}
                    showsUserLocation={true}>
                    {this.state.marker ? (
                        this.state.marker.posts.map((p, index) => {
                            return (
                                <Marker key={index}
                                    coordinate={{ latitude: p.storeLat, longitude: p.storeLong }}
                                    onPress={() => this.clickMarker(p, index)}
                                //onPress={()=>{this.setState({isClick:true})}}
                                >
                                    <View style={styles.ratingBox}>
                                        <Entypo
                                            name={"location-pin"}
                                            size={37}
                                            color={mainPink}
                                        />

                                    </View>

                                </Marker>


                            )
                        })
                    ) : null
                    }
                </MapView>

                {this.state.indexNum > -1 ? (
                    <Modal.BottomModal
                        visible={this.state.isClick}
                        onTouchOutside={() => this.setState({ isClick: false })}
                        width={0.1}
                        height={170}
                        onSwipeOut={() => this.setState({ isClick: false })}
                    >
                        <ModalContent>
                            <ModalContainer>
                                <TouchableOpacity onPress={() => {
                                    
                                    this.setState({ isClick: false })
                                    this.state.navigation.navigate("StoreDetail", { 
                                    storeName: this.state.marker.posts[this.state.indexNum].storeName, 
                                    placeId: this.state.marker.posts[this.state.indexNum].placeId })}}>
                                    <Image
                                        source={{ uri: this.state.marker.posts[this.state.indexNum].files[0].url }}
                                        style={styles.cardImage, {width: 120, height:120, borderRadius:10}}
                                    />
                                </TouchableOpacity>
                                <SubContainer>
                                    <Title>
                                        <TouchableOpacity onPress={() => {
                                            this.setState({ isClick: false })
                                            this.props.navigation.navigate("StoreDetail", { 
                                            storeName: this.state.marker.posts[this.state.indexNum].storeName, 
                                            placeId: this.state.marker.posts[this.state.indexNum].placeId })}}>
                                            <Bold>{this.state.marker.posts[this.state.indexNum].storeName}</Bold>
                                        </TouchableOpacity>
                                        <Star rating={this.state.marker.posts[this.state.indexNum].rating} size={25} color={StarColor} />
                                    </Title>
                                    <Info>
                                        <Text style={{fontSize:13}}>
                                            {this.state.marker.posts[this.state.indexNum].storeLocation.length > 33
                                                ? `${this.state.marker.posts[this.state.indexNum].storeLocation.substring(0, 31)}...`
                                                : this.state.marker.posts[this.state.indexNum].storeLocation}
                                        </Text>
                                        <View flexDirection="row">
                                            {this.state.marker.posts[this.state.indexNum].details.map((detail) => (
                                                <DetailView key={detail}>
                                                    <Text>{detail}</Text>
                                                </DetailView>
                                            ))}
                                        </View>
                                    </Info>
                                </SubContainer>
                            </ModalContainer>
                        </ModalContent>
                    </Modal.BottomModal>
                ) : null}

            </View>

        )

    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject
    },
    map1: {
        flex: 10,
        ...StyleSheet.absoluteFillObject
    },
    carousel: {
        position: 'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        height: 200,
        width: 300,
        padding: 24,
        borderRadius: 24

    },
    viewSub: {
        flexDirection: 'row'
    },
    ratingBox: {
        alignItems: "center",
        justifyContent: "center"

    },
    cardImage: {
        height: 120,
        width: 300,
        bottom: 0,
        color: "red",
        position: 'absolute',
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        alignContent: 'center',
        justifyContent: 'center',


    },
    cardTitle: {
        color: "white",
        fontSize: 22,
        alignSelf: 'center',
        marginBottom: 10
    },
    viewSubRating: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center"
    },
    markerImage: {
        width: 32,
        height: 32,
        opacity: 1,
        borderWidth: 2,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    titleModal: {
        fontSize: 22,
        alignSelf: 'center',
    }
})

AppRegistry.registerComponent("mapfocus", () => screens);

export default withNavigation(ProfileMapPresenter);