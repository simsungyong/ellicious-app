import React, {useState, useEffect} from 'react';
//import MapView,{Marker, PROVIDER_GOOGLE, Callout, Polygon} from 'react-native-maps';
import { StyleSheet,Image, Text, View, Dimensions, TextBase } from 'react-native';
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../../../components/Loader';
import {CATEGORYINFO_FRAGMENT} from '../../../fragments';
import ProfileMapPresenter from '../../Tabs/Profile/ProfileMapPresenter';
import styled from "styled-components";

const Touchable = styled.TouchableOpacity`
    margin-bottom : 20px;
    margin-right : 10px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    subContainer: {
        justifyContent : 'flex-start'
    }
})

const region = {  
    latitude: 37.6247855,
    longitude: 127.0773206,
    latitudeDelta: 0.057864195044303443,
    longitudeDelta: 0.0640142817690068,
  };

const GET_CATEGORYINFO = gql`
  query seeCategory($userId: String!){
    seeCategory(userId: $userId) {
      ...CategoryInfo
      }
    }
    ${CATEGORYINFO_FRAGMENT}
`;

const ProfileMapContainer=({navigation, userId})=> {
    const [mapIdx, setIndex] = useState(0);
    const [confirm, setConform] = useState(false);
    const { loading, data } = useQuery(GET_CATEGORYINFO, {
        variables: { userId: userId }
      });
    if(!loading) {
        console.log(data)
    }
    const handleIndex = async (index) => {
        await setConform(true)
        await setIndex(index)
        await setConform(false)
        console.log(index)
    }
    
    return(
        <View style={styles.container}>
            {loading ? <Loader/> : (
            <>
            {confirm ? <Loader/> : (
                <>
                <ProfileMapPresenter marker={data.seeCategory[mapIdx]} region={region} navigation={navigation}/>
                <View style={styles.subContainer}>
                    {data.seeCategory.map((category, index)=>(
                        <Touchable
                        key={index}
                        onPress={() => handleIndex(index)}
                        >
                            <>
                            <Text>{category.categoryName}</Text>
                            </>
                        </Touchable>
                    ))}
                </View>
                </>
            )}
            </>
            )}
        </View>
    )
}
export default ProfileMapContainer;