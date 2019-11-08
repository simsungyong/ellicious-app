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

const SearchAccountBox = ({ navigation, username, firstName, avatar, id }) => (
  <TouchableOpacity onPress={() => navigation.navigate("UserDetail", { id, username })}>
    <Header>
      <Image 
        style={{height: 40, width: 40, borderRadius:20}}
        source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
      <View>
        <Text>{ username }</Text>
        <Text>{ firstName }</Text>
      </View>
    </Header>
  </TouchableOpacity>
);

SearchAccountBox.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  avatar: PropTypes.string
};

export default withNavigation(SearchAccountBox);