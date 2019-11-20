import React, { useState } from "react";
import { Image, Platform,TextInput, Alert } from "react-native";
import styled from "styled-components";
import { Ionicons, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import moment from "moment";
import { IconColor, StarColor, TINT_COLOR, Grey, PointPink, BG_COLOR, LightGrey, Line, LightPink } from '../components/Color';
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";
import Hr from "hr-native";
import Stars from 'react-native-stars';
//import { PICK_ITEM } from "../screens/Tabs/MyPick";


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
  padding : 5px;
`;
const StoreName = styled.Text`
  font-size: 30px;
  font-weight: 800;
  margin-bottom : 5px;
  color : ${TINT_COLOR};
`;
const Store = styled.View`
  margin-top : 10px;
  margin-bottom : 10px;
  align-items: center;
`;
const Rating = styled.View`
`;

const CaptionCon = styled.View`
  flex-direction: row;
  padding : 10px;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;
const Text = styled.Text`
  margin-left : 5px;
`;
const View = styled.View`
  flex : 1;
  padding : 5px;
`;

const LikeComments = styled.View`
  flex-direction: row;
  padding : 5px;
  margin-right : 5px;
  justifyContent : flex-end;
  margin-top : 10px;
`;
const LikeCommentIcon = styled.View`
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

const Caption = styled.Text`
  font-size : 15px;
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
                style={{height: 40, width: 40, borderRadius:15}}
                source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}/>
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
            <View/>
            <Touchable>
              <IconCon>
                <MaterialCommunityIcons
                  color={IconColor}
                  size={25}
                  name={"dots-horizontal"}
                />
              </IconCon>
            </Touchable>
          </Header>

          <CaptionCon>
            <Caption>{caption}</Caption>
          </CaptionCon>

          <Swiper 
            showsPagination={false}
            style={{height: constants.width/1}}>
              {files.map(file=>(
                <Image
                  style={{width: constants.width, height:constants.width/1}}
                  key={file.id}
                   source={{uri: file.url}}/>
              ))}
          </Swiper>
          <StoreInfo>
            <Store>
            <Touchable>
              <StoreName>{storeName}</StoreName>
            </Touchable>
            <Rating>
                <Stars
                      default={rating}
                      count={5}
                      half={true}
                      starSize={50}
                      fullStar={<FontAwesome
                        color={StarColor}
                        size={25}
                        name={"star"}
                      />}
                      emptyStar={<FontAwesome
                        color={StarColor}
                        size={25}
                        name={"star-o"}
                      />}
                      halfStar={<FontAwesome
                        color={StarColor}
                        size={25}
                        name={"star-half-empty"}
                      />}
                    />           
            </Rating>
            </Store>
          </StoreInfo>

          <LikeComments>
            <Text>{likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`}</Text>
            <Touchable onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: false})}>
              {comments.length >=1 ? (
                <Text> {`댓글 ${comments.length}개`}</Text>
               ) : null}
            </Touchable>
            <Text>{pickCount === 1 ? "콕집기 1개" : `콕집기 ${pickCount}개`}</Text>
          </LikeComments>

          <Hr 
            lineStyle={{ backgroundColor : Line }}
          />

          <LikeCommentIcon>
          <Touchable onPress={handleLike}>
          <IconCon>
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
            <Text>좋아요</Text>
          </IconCon>
        </Touchable>
        <Touchable onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: true})}>
          <IconCon>
            <EvilIcons
              color={IconColor}
              size={30}
              name={Platform.OS === "ios" ? "comment" : "comment"}
            />
            <Text>댓글</Text>
          </IconCon>
        </Touchable>
      
        <Touchable onPress={handlePick}>
          <IconCon>
            <AntDesign
              color={isPicked ? PointPink : TINT_COLOR }
              size={20}
              name={isPicked ? "pushpin" : "pushpino" }
            />
            <Text>콕집기</Text>
          </IconCon>
        </Touchable>
          </LikeCommentIcon>
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
