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
import { IconColor, StarColor, TINT_COLOR, mainPink } from '../components/Color';
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";

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
  flex-direction : row;=
`;
const SubCon = styled.View`
  padding : 5px;
  justify-content: center;
  align-items: center;
  background-color : ${mainPink}
`;
const IconsCon = styled.View`
  margin-top : 3px;
`;
const View=styled.View`
  flex : 1;
`;

const IconCon = styled.View`
  flex-direction : row;
  justify-content: center;
  align-items: center;
  margin-top : 3px;
`;

const Main = styled.View`
  flex : 6;
  padding : 5px;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
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
  margin-top : 5px;
  color : ${TINT_COLOR};
`;
const Rating = styled.Text`
  font-size: 12px;
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

//<Bold>{likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`}</Bold>

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

    /* const starRating = async () => {
      if(rating == 1){
        
      }
    } */

    return (
      <Card>
        <Container>
          <SubCon>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { id: user.id, username })
              }
            >
            <Image 
              style={{height: 45, width: 45, borderRadius:20}}
              source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
            </Touchable>
            <IconsCon>
              <Touchable onPress={handleLike}>
                <IconCon>
                  <Ionicons
                    size={28}
                    color={isLiked ? styles.redColor : IconColor}
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
                  <EvilIcons
                    color={IconColor}
                    size={33}
                    name={Platform.OS === "ios" ? "comment" : "comment"}
                  />
                </IconCon>
              </Touchable>
              <Touchable>
                <IconCon>
                  <EvilIcons
                    color={IconColor}
                    size={33}
                    name={Platform.OS === "ios" ? "search" : "search"}
                  />
                </IconCon>
              </Touchable>
            </IconsCon>
            <View/>
          </SubCon>

          <Main>
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
            <StoreCon>
              <StoreInfo>
                <Touchable>
                  <StoreName>{storeName}</StoreName>
                </Touchable>
                <Rating>
                  <FontAwesome
                    color={StarColor}
                    size={25}
                    name={"star"}
                  />
                </Rating>
              </StoreInfo>
            </StoreCon>

            <InfoCon>
              <CaptionCon>
              <Touchable
                onPress={() =>
                  navigation.navigate("UserDetail", { id: user.id, username })
                }
              >
                  <Bold>{user.username}</Bold>
                </Touchable>
                <Caption>{caption}</Caption>
              </CaptionCon>
            </InfoCon>
            <Touchable onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: false})}>
              {comments.length >=1 ? (
                <CommentCount>
                {`댓글 ${comments.length}개 모두 보기 `}
                </CommentCount>
                ) : null}
            </Touchable>
            <Touchable>
              {comments.length >= 1 ?(
                <Caption>
                  {comments.length >= 1 ?(
                      <Image 
                        style={{height: 20, width: 20, borderRadius:20}}
                        source={{uri: user.avatar}}/> 
                  ) : null}
                    <Bold>{comments.length >= 1 ? (comments[0].user.username): null }</Bold> 
                    {comments.length >= 1 ?( ` ${comments[0].text}`) :null}
                </Caption>) : null}
            </Touchable>
            <CommentCount>{time}</CommentCount>
          </Main>
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
