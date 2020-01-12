import React from "react";
import { TouchableOpacity, Image, Text } from "react-native";
import { withNavigation } from "react-navigation";
import PropTypes from "prop-types";
import constants from "../../constants";
import styled from "styled-components";
import FollowButton from '../FollowButton';

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

const MessageAccountBox = ({ navigation, username, firstName, avatar, id, isSelf, rooms }) => {
    console.log(rooms)
    return(
      <Container>
          {!isSelf ? (
              <TouchableOpacity onPress={() => {
                  navigation.navigate("MessageDetail", { username, userId: id }) } } >
                  <Header>
                  <Profile>
                      <Image 
                        style={{height: 40, width: 40, borderRadius:20}}
                        source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}
                      />
                  </Profile>
                  <UserInfo>
                      <Bold>{ username }</Bold>
                      <Text>{ firstName }</Text>
                  </UserInfo>
                  </Header>
              </TouchableOpacity>
          ) : null
      }
      </Container>
    )
    };

MessageAccountBox.propTypes = {
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  firstName: PropTypes.string,
  avatar: PropTypes.string,
  isSelf: PropTypes.bool,
  rooms: PropTypes.array
};

export default withNavigation(MessageAccountBox);