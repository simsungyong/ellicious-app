import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import styled from "styled-components";
import {mainPink} from "../Color";

const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;
const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
`;
const Profile = styled.View`
  margin-right : 5px;
`;

const SearchStoreBox = ({ navigation, storeName, storeLocation, id, placeId }) => (
  <TouchableOpacity onPress={() => navigation.navigate("StoreDetail", { storeName, placeId })}>
    <Header>
      <Profile>
        <Entypo
        name={"location-pin"}
        size={40}
        color={mainPink} />

        
        </Profile>
        <View>
          <Bold>{ storeName }</Bold>
          <Text>{ (storeLocation.length >= 27) ? `${storeLocation.substring(0, 25)}...` : storeLocation }</Text>
        </View>
    </Header>
  </TouchableOpacity>
);

SearchStoreBox.propTypes = {
  id: PropTypes.string.isRequired,
  storeName: PropTypes.string.isRequired,
  storeLocation: PropTypes.string,
  placeId: PropTypes.string.isRequired
};

export default withNavigation(SearchStoreBox);