import React from "react";
import { TouchableOpacity, Image, Text, View } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";
import FollowButton from './FollowButton';

const Container = styled.View`
  flex : 1;
  flex-direction: row;
`;

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

const SearchAccountBox = ({ navigation, username, firstName, avatar, id, isSelf }) => (
  <Container>
    <TouchableOpacity onPress={() => {
      navigation.navigate("UserDetail", { id, username }) } } >
      <Header>
        <Profile>
          <Image 
            style={{height: 40, width: 40, borderRadius:20}}
            source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}
            />
        </Profile>
        <View>
          <Bold>{ username }</Bold>
          <Text>{ firstName }</Text>
        </View>
      </Header>
    </TouchableOpacity>
    <FollowButton/>
  </Container>
);

SearchAccountBox.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  avatar: PropTypes.string,
  isSelf: PropTypes.bool
};

export default withNavigation(SearchAccountBox);