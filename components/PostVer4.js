import React, { useState } from "react";
import { Image, Platform, StyleSheet,TextInput } from "react-native";
import styled from "styled-components";
import { Ionicons, EvilIcons, FontAwesome } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import moment from "moment";
import { IconColor, StarColor, TINT_COLOR, mainPink, PointPink, LightGrey } from '../components/Color';
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";
import Hr from "hr-native";

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

const Container =styled.View`
  flex : 1;
`;
const Header =styled.View`
  padding: 5px;
  flex-direction: row;
  align-items: center;  
  padding : 5px;
`;

const UserInfo = styled.View`
  margin-left: 10px;
`;
const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const StoreInfo = styled.View`
  align-items: center;
  margin-bottom:10px;
  margin-top : 10px;
  padding : 5px;
`;
const StoreName = styled.Text`
  font-size: 30px;
  font-weight: 800;
  margin-bottom : 5px;
  color : ${TINT_COLOR};
`;
const Rating = styled.Text`
  font-size: 12px;
`;

const CaptionCon = styled.View`
  flex-direction: row;
  margin-bottom : 15px;
  padding : 5px;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;
const Text = styled.Text`
`;
const View = styled.View`
  flex : 1;
  padding : 5px;
`;

const LikeComments = styled.View`
  flex-direction: row;
  padding : 5px;
  justifyContent: space-between;
  margin-left : 5px;
  margin-right : 5px;
`;

const IconCon = styled.View`
  flex-direction: row;
  flex : 1;
  align-items: center;
  
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
        const avatar = user.avatar;
        const username = user.username;
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
        <Container>
          <Header>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { id: user.id, username })
              }
            >
              <Image 
                style={{height: 40, width: 40, borderRadius:20}}
                source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
            </Touchable>
        
            <UserInfo>
              <Touchable
                onPress={() =>
                  navigation.navigate("UserDetail", { id: user.id, username })
                }
              >
                <Bold>{user.username}</Bold>
              </Touchable>
              <CommentCount>{time}</CommentCount>
            </UserInfo>
          </Header>
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
          <StoreInfo>
            <Touchable>
              <StoreName>{storeName}</StoreName>
            </Touchable>
            <Rating>
              <FontAwesome
                color={StarColor}
                size={24}
                name={"star"}
              />
            </Rating>
          </StoreInfo>
          <CaptionCon>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { id: user.id, username })
              }>
              <Bold>{user.username}</Bold>
            </Touchable>
            <Text>{caption}</Text>
          </CaptionCon>
          <LikeComments>
            <Text>{likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`}</Text>
            <View/>
            <Touchable onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: false})}>
              {comments.length >=1 ? (
                <Text> {`댓글 ${comments.length}개`}</Text>
               ) : null}
            </Touchable>
          </LikeComments>

          <Hr 
            lineStyle={{
              backgroundColor : LightGrey
            }}
          />

          <LikeComments>
          <Touchable onPress={handleLike}>
          <IconCon>
            <Text>좋아요</Text>
            <Ionicons
              size={25}
              color={isLiked ? PointPink : IconColor }
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
        <Touchable onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: true})}>
          <IconCon>
            <Text>댓글</Text>
            <EvilIcons
              color={IconColor}
              size={30}
              name={Platform.OS === "ios" ? "comment" : "comment"}
            />
          </IconCon>
        </Touchable>
        <Touchable>
          <IconCon>
            <Text>더보기</Text>
            <Ionicons
              color={IconColor}
              size={25}
              name={Platform.OS === "ios" ? "ios-search" : "md-search"}
            />
          </IconCon>
        </Touchable>
          </LikeComments>
        </Container>
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
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired
    })
  };

  export default withNavigation(Post);
