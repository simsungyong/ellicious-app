import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";

const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

const SearchStoreBox = ({ navigation, storeName, storeLocation, id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Profile", { id })}>
    <Header>
      <Image 
        style={{height: 40, width: 40, borderRadius:20}}
        source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
      <View>
        <Text>{ storeName }</Text>
        <Text>{ (storeLocation.length >= 30) ? `${storeLocation.substring(0, 27)}...` : storeLocation }</Text>
      </View>
    </Header>
  </TouchableOpacity>
);

SearchStoreBox.propTypes = {
  id: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  storeLocation: PropTypes.string
};

export default withNavigation(SearchStoreBox);