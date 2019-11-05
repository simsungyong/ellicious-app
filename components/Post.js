import React, { useState } from "react";
import { Image, Platform, StyleSheet } from "react-native";
import styled from "styled-components";
import { Ionicons, FontAwesome, EvilIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import moment from "moment";
<<<<<<< HEAD
import { withNavigation } from "react-navigation";

=======
import {TINT_COLOR, StarColor} from '../components/Color';
import {Card} from 'native-base'
>>>>>>> 45e41820c23ba5173ff34d720e5e03f44b3fb1aa

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
export const TOGGLE_PICK = gql`
  mutation togglePick($postId: String!) {
    togglePick(postId: $postId)
  }
`;

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`
  margin-bottom: 10px;
  flex : 1;
  background-color : #ffffff
`;

const Header = styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;
`;

const HeaderUserContainer = styled.View`
  margin-left: 10px;
`;

const StoreCon = styled.View`
  padding : 5px;
`;

const StoreInfo = styled.View`
  align-items: center;
  margin-bottom:10px;
`;
const StoreName = styled.Text`
  font-size: 30px;
  font-weight: 800;
  margin-bottom : 5px;
  color : ${TINT_COLOR};
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;
const Location = styled.Text`
  font-size: 12px;
`;
const Rating = styled.Text`
  font-size: 12px;
`;

const BottomCon = styled.View`
  padding: 10px;
`;

const IconsCon = styled.View`
  flex-direction: row;
`;

const IconCon = styled.View`
  margin-right: 13px;
`;
const InfoCon=styled.View`
`;

const Caption = styled.Text`
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;
const CaptionCon = styled.View`
  flex-direction: row;
`;
const CommentCon = styled.View`
  margin-bottom : 5px;
`;

const Text=styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Post = ({
    user, 
    storeLocation,
    storeName, 
    files=[],
    id,
    likeCount: likeCountProp,
    caption,
    comments=[],
    isLiked: isLikedProp,
    navigation,
    isPicked: isPickedProp,
    pickCount: pickCountProp,
    createdAt,
    rating}) => {
        const [isLiked, setIsLiked] = useState(isLikedProp);
        const [likeCount, setLikeCount] = useState(likeCountProp);
        const [isPicked, setIsPicked] = useState(isPickedProp);
        const [pickCount, setPickCount] = useState(pickCountProp);

        const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
        variables: {
        postId: id
        }});

        const [togglePickMutation] = useMutation(TOGGLE_PICK, {
          variables:{
            postId: id
          }
        });
      
    const time=moment(createdAt).startOf('hour').fromNow();

    
    const handleLike = async () =>{
      if(isLiked === true){
        setLikeCount(l=>l-1);
      }else{
        setLikeCount(l=>l+1);
      }
      setIsLiked(p => !p);
      try{
        await toggleLikeMutaton();
      }catch (e){}
    };

    const handlePick = async () =>{
      if(isPicked === true){
        setPickCount(l=>l-1);
      }else{
        setPickCount(l=>l+1);
      }
      setIsPicked(p => !p);
      try{
        await togglePickMutation();
      }catch (e){
        console.log(e);
      }
    };

    return (
      <Card>
      <Header>
        <Touchable>
          <Image 
            style={{height: 40, width: 40, borderRadius:20}}
            source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
        </Touchable>
       
        <HeaderUserContainer>
          <Touchable>
            <Bold>{user.username}</Bold>
          </Touchable>
          <Text>서울시 노원구 공릉동</Text>
        </HeaderUserContainer>
      </Header>

      <StoreCon>
        <StoreInfo>
          <Touchable>
            <StoreName>{storeName}</StoreName>
          </Touchable>
            <Rating>
              <FontAwesome
                color={styles.StarColor}
                size={24}
                name={"star"}
              />
            </Rating>
        </StoreInfo>
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
        <Touchable onPress={handleLike}>
          <IconCon>
            <Ionicons
              size={28}
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
            <EvilIcons
              color={styles.TINT_COLOR}
              size={33}
              name={Platform.OS === "ios" ? "comment" : "md-text"}
            />
          </IconCon>
        </Touchable>
        <Touchable>
          <IconCon>
            <Ionicons
              color={styles.TINT_COLOR}
              size={28}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          </IconCon>
        </Touchable>
      </IconsCon>
      <InfoCon>
        <Touchable>
          <Bold>{likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`}</Bold>
        </Touchable>
        <CaptionCon>
          <Touchable>
            <Bold>{user.username}</Bold>
          </Touchable>
          <Caption>{caption}</Caption>
        </CaptionCon>
      </InfoCon>
    
    <CommentCon>
        <Touchable>
          <CommentCount>{comments.length >=1 ? (`댓글 ${comments.length}개 모두 보기`) : null}</CommentCount>
        </Touchable>
        <Touchable>
        <Caption>
          {comments.length >= 1 ?(
            <Image 
              style={{height: 20, width: 20, borderRadius:20}}
              source={{uri: user.avatar}}/>
          ) : null}
            <Bold>{comments.length >= 1 ? comments[0].user.username: null }</Bold> 
            {comments.length >= 1 ? comments[0].text :null}
        </Caption>
        </Touchable>
      </CommentCon>
      <CommentCount>{time}</CommentCount>
    </BottomCon>
  </Card>
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
