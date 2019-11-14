import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../constants";
import styled from "styled-components";
import FollowButton from './FollowButton';

const Container = styled.View`
  flex : 1;
  flex-direction: row;
`;
const UserInfo = styled.View`
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
const View = styled.View`
  flex : 1;
`;
const Button = styled.View`
  margin-right : 10px;
  alignItems: center;
  justifyContent: center;
`;

const MessageRooms = ({ id }) => (
  <Container>
    <Text>{id}</Text>
  </Container>
);

MessageRooms.propTypes = {
  id: PropTypes.string.isRequired
};

export default MessageRooms;