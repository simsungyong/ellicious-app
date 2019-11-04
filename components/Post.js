import React, { useState } from "react";
import { Image, Platform } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  margin-bottom: 30px;
`;

const Header = styled.View`
  background-color : #f5b3b3;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  flex: 2;
`;
const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const StoreCon = styled.View`
  background-color : #f5d2b3;
  flex : 4;
  align-items:center;
`;
const Bold = styled.Text`
  font-weight: 500;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const Rating = styled.Text`
  font-size: 12px;
`;

const BottomCon = styled.View`
  background-color : #d1f5b3;
  flex : 3;
  padding: 10px;
`;

const IconsCon = styled.View`
  background-color : #b3e0f5;
  flex: 1;
  flex-direction: row;
`;

const IconCon = styled.View`
  margin-right: 10px;
`;
const InfoCon=styled.View`
  background-color : #cab3f5;
  flex : 2;
`;

const Caption = styled.Text`
  margin: 5px 0px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;


const Post = ({
    user, 
    storeLocation,
    storeName, 
    files=[],
    likeCount: likeCountProp,
    caption,
    comments=[],
    isLiked: isLikedProp,
    navigation,
    isPicked: isPickedProp,
    pickCount,
    rating}) => {
        const [isLiked, setIsLiked] = useState(isLikedProp);
        const [likeCount, setLikeCount] = useState(likeCountProp);
        //const toggleLikeMutaton = useMutation(TOGGLE_LIKE, {
        //variables: {
        //postId: id
        //}
    //});
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
            <Location>{storeLocation}</Location>
          </HeaderUserContainer>
        </Touchable>
      </Header>

      <StoreCon>
        <Touchable>
          <Bold size={30}>{storeName}</Bold>
          <Rating>별점 : {rating}</Rating>
        </Touchable>
      </StoreCon>

      <Swiper 
        showsPagination={false}
        style={{height: constants.height/2.7}}>
          {files.map(file=>(
          <Image
            style={{width: constants.width, height:constants.height/2.7}}
            key={file.id}
          source={{uri: file.url}}/>
        ))}
      </Swiper>

      <BottomCon>
        <IconsCon>
        <Touchable onPress={null}>
          <IconCon>
            <Ionicons
              size={24}
              color={isLiked ? styles.redColor : styles.blackColor}
              name={
                Platform.OS === "ios"
                  ? isLiked
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : isLiked
                    ? "md-heart"
                    : "md-heart-empty"
              }
            />
          </IconCon>
        </Touchable>
        <Touchable>
          <IconCon>
            <Ionicons
              color={styles.blackColor}
              size={24}
              name={Platform.OS === "ios" ? "ios-text" : "md-text"}
            />
          </IconCon>
        </Touchable>
        <Touchable>
          <IconCon>
            <Ionicons
              color={styles.blackColor}
              size={24}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          </IconCon>
        </Touchable>
      </IconsCon>
      <InfoCon>
        <Touchable>
          <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
        </Touchable>
        <Caption>
          <Bold>{user.username}</Bold> {caption}
        </Caption>
        <Touchable>
          <CommentCount>See all {comments.length} comments</CommentCount>
        </Touchable>
      </InfoCon>
    </BottomCon>
  </Container>
  );
};

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