import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";

const SearchStoreBox = ({ navigation, storeName, storeLocation, id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("Profile", { id })}>
    <Text>{ storeName }</Text>
    <Text>{ (storeLocation.length >= 30) ? `${storeLocation.substring(0, 27)}...` : storeLocation }</Text>
  </TouchableOpacity>
);

SearchStoreBox.propTypes = {
  id: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  storeLocation: PropTypes.string
};

export default withNavigation(SearchStoreBox);