import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {TouchableWithoutFeedback} from 'react-native'; //버튼
import {withNavigation} from 'react-navigation'; 
import { ScrollView, RefreshControl, Platform, View, Text,TouchableOpacity, TextBase} from "react-native";


const HContainer = styled.View`
    margin-bottom:20px;
    margin-horizontal:15px;


    `;
const MapStore=({
    place_id,
    name,
    formatted_address,
    
})=>(
    <HContainer>
        <Text>{name}</Text>
        <Text>{formatted_address}</Text>
    </HContainer>
);


MapStore.propTypes={
    place_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    formatted_address: PropTypes.string.isRequired,
    /*geometry: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    })*/
}
export default MapStore;