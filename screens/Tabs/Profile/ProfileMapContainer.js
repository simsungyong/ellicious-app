import React, {useState, useEffect} from 'react';
import MapView,{Marker, PROVIDER_GOOGLE, Callout, Polygon} from 'react-native-maps';
import { StyleSheet,Image, Text, View, Dimensions, TextBase, TouchableOpacity } from 'react-native';
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../../../components/Loader';
import {CATEGORYINFO_FRAGMENT} from '../../../fragments';
import ProfileMapPresenter from '../../Tabs/Profile/ProfileMapPresenter';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        flex: 10,
        justifyContent : 'flex-end',
        flexDirection: 'row',

    }
})

const region = {  
    latitude: 37.6247855,
    longitude: 127.0773206,
    latitudeDelta: 0.057864195044303443,
    longitudeDelta: 0.0640142817690068,
  };

const GET_CATEGORYINFO = gql`
  {
    seeCategory {
        ...CategoryInfo
    }
  } ${CATEGORYINFO_FRAGMENT}
`;


const ProfileMapContainer=()=> {
    const [index, setIndex] = useState(0);
    const { loading, data } = useQuery(GET_CATEGORYINFO);
    
    

    
    return(
        <View style={styles.container}>
            {loading ? <Loader/> : <ProfileMapPresenter marker={data.seeCategory[index]} region={region}/> }
            <View style={styles.subContainer}>
                {data.seeCategory.map((category, index)=>(
                    <TouchableOpacity key={index}>
                        <>
                        <Text>{category.categoryName}</Text>
                        </>
                    </TouchableOpacity>
                ))}
            </View>

        </View>
    )
}
export default ProfileMapContainer;

          
