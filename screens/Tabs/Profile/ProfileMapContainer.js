import React, {useState, useEffect} from 'react';
//import MapView,{Marker, PROVIDER_GOOGLE, Callout, Polygon} from 'react-native-maps';
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
        flex: 1,
        justifyContent : 'flex-start',
        

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
    const [mapIdx, setIndex] = useState(0);
    const [confirm, setConform] = useState(false);
    const { loading, data } = useQuery(GET_CATEGORYINFO);

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
                <ProfileMapPresenter marker={data.seeCategory[mapIdx]} region={region}/>
                <View style={styles.subContainer}>
                    {data.seeCategory.map((category, index)=>(
                        <TouchableOpacity key={index} onPress={() => handleIndex(index)}>
                            <>
                            <Text>{category.categoryName}</Text>
                            </>
                        </TouchableOpacity>
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

          
