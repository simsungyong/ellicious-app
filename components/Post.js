import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";

const Container = styled.View`
  margin-bottom: 40px;
`;
const Header = styled.View`
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const IconsContainer = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;
const IconContainer = styled.View`
  margin-right: 10px;
`;
const InfoContainer = styled.View`
  padding: 10px;
`;
const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;



const Post = ({user, location, files}) => {
    return (
        <Container>
            <Header>
                <Touchable>
                    <Image 
                    style={{height: 40, width: 40, borderRadius:20}}
                    source={{uri: user.avatar}}/>
                </Touchable>
                <Touchable>
                    <HeaderUserContainer>
                        <Bold>{user.username}</Bold>
                        <Location>{location}</Location>
                    </HeaderUserContainer>
                </Touchable>
            </Header>
            <Swiper style={{height: constants.height/2.7}}>
                {files.map(file=>(
                    <Image
                        style={{width: constants.width, height:constants.height/2.7}}
                        key={file.id}
                        source={{uri: file.url}}/>
                ))}
            </Swiper>
        </Container>
    );
}

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    pickCount: PropTypes.number.isRequired,
    isPicked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired,
    caption: PropTypes.string.isRequired,
    location: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired
    })
  };

  export default Post;