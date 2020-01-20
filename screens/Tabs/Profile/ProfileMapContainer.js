import React, {useState, useEffect} from 'react';
//import MapView,{Marker, PROVIDER_GOOGLE, Callout, Polygon} from 'react-native-maps';
import { StyleSheet,Image, Text, View, Dimensions, TextBase, ScrollView, TextInput } from 'react-native';
import { IconColor, MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from '../../../components/Loader';
import {CATEGORYINFO_FRAGMENT} from '../../../fragments';
import ProfileMapPresenter from '../../Tabs/Profile/ProfileMapPresenter';
import styled from "styled-components";
import Modal, {ModalTitle, ModalContent, ModalFooter, ModalButton} from 'react-native-modals';

const Touchable = styled.TouchableOpacity`
    margin-bottom : 20px;
    margin-right : 10px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
    },
    subContainer: {
        marginTop: 10,
        marginRight: 10,
        alignItems: 'flex-end'
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
    const [modalAndTitle, setmodalAndTitle] = useState(false);
    const { loading, data } = useQuery(GET_CATEGORYINFO, {
        variables: { userId: userId }
      });
    const handleIndex = async (index) => {
        await setmodalAndTitle(false)
        await setConform(true)
        await setIndex(index)
        await setConform(false)
    }
    
    return(
        <View style={styles.container}>
            {loading ? <Loader/> : (
            <>
            {confirm ? <Loader/> : (
                <>
                <ProfileMapPresenter marker={data.seeCategory[mapIdx]} region={region} navigation={navigation}/>
                <View style={styles.subContainer}>
                    <Touchable onPress={() => setmodalAndTitle(true)}>
                        <MaterialCommunityIcons
                        color={IconColor}
                        size={25}
                        name={"dots-horizontal"}
                        />
                    </Touchable>
                    <Modal
                        visible={modalAndTitle}
                        onTouchOutside={() => setmodalAndTitle(false)}
                        height={0.5}
                        width={0.8}
                        onSwipeOut={() => setmodalAndTitle(false)}
                    >
                        <ModalContent>
                        <ScrollView>
                        {data.seeCategory.map((category, index)=>(
                            <ModalButton
                                key={index}
                                text={category.categoryName}
                                onPress={() => handleIndex(index)}
                            />
                        ))}
                        </ScrollView>
                        </ModalContent>
                        
                        <ModalFooter>
                        <ModalButton
                            text="카테고리 추가"
                            onPress={() => setmodalAndTitle(false)}
                        />
                        </ModalFooter>
                    </Modal>
                </View>
                </>
            )}
            </>
            )}
        </View>
    )
}
export default ProfileMapContainer;