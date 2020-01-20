import React, { useState } from "react";
import { Image, Platform,TextInput, Alert } from "react-native";
import styled from "styled-components";
import { Ionicons, EvilIcons, FontAwesome, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation, useQuery } from "react-apollo-hooks";
import styles from "../styles";
import moment from "moment";
import { IconColor, StarColor, TINT_COLOR, Grey, PointPink, BG_COLOR, LightGrey, Line, LightPink, mainPink } from '../components/Color';
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";
import Hr from "hr-native";
import Stars from 'react-native-stars';
//import { PICK_ITEM } from "../screens/Tabs/MyPick";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal, {ModalTitle, ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import { POST_FRAGMENT } from "../fragments";
import {ME} from '../screens/Tabs/Profile/Profile';
import { UNFOLLOW } from "./UserProfile";
import { ScrollView } from "react-native-gesture-handler";
import {GET_PICK} from '../screens/Tabs/MyPick'
export const FEED_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

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
export const DELETE_POST = gql`
  mutation editPost($postId: String!) {
    editPost(id: $postId action: DELETE){
      id
    }
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
  font-size: 24px;
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
const Tag = styled.View`
padding : 3px;
padding-left : 5px;
flex-direction: row;

flex : 1;
`;
const TagBox = styled.View`
borderRadius:5;
margin-right: 3px;
height : 25;
padding : 5px;
background-color :  ${LightGrey}
align-items: center; 
justifyContent: center;
`;
const TagText = styled.Text``;

const ModalButtonTest=styled.TouchableOpacity`
margin-bottom : 10px;
align-items: center; 
justifyContent: center;
`;

const Post = ({
    user, 
    storeLocation,
    storeName,
    placeId,
    files=[],
    id,
    details=[],
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
      const [isloading, setIsLoading] = useState(false);
      const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
      const [modalAndTitle, setmodalAndTitle] = useState(false);

      const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
        variables: {
        postId: id
        }});

      const [togglePickMutation] = useMutation(TOGGLE_PICK, {
        refetchQueries:()=>[{query: GET_PICK}]

      });
      
      const [deleteMutation] = useMutation(DELETE_POST, {
        refetchQueries: ()=>[{query: FEED_QUERY},{query: ME}]
      });

      const [unFollowMutation] = useMutation(UNFOLLOW, {
        refetchQueries: ()=>[{query: FEED_QUERY},{query: ME}]
      });

      const handleDelete =()=> {
        try{
          setbottomModalAndTitle(false)
          setmodalAndTitle(true)
        }catch(e) {
          console.log(e)
        }
      }

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
        await togglePickMutation({
          variables:{
            postId: id
          },
        });
      }catch (e){
        console.log(e);
      }
    };

    const handleSubmit = async() => {
      try {
        setIsLoading(true);
        const { data } = await deleteMutation({
          variables:{
            postId: id
          }
        });
        if(data) {
          navigation.navigate("TabNavigation");
        }
      } catch (e) {
        console.log(e)
      } finally {
        setmodalAndTitle(false);
        setIsLoading(false);
      }
    }

    const handleUnfollow = async() => {
      try {
        const { data } = await unFollowMutation({
          variables: {
            id: user.id
          }
        });
        if(data) {
          navigation.navigate("TabNavigation");
        }
      } catch(e) {
        console.log(e)
      } finally {
        setbottomModalAndTitle(false)
      }
    }

    return (
      <Card>
        <Container>
          <Header>
            <Touchable
              onPress={() =>
                navigation.navigate("UserDetail", { id: user.id, username })
              }
            >
              {avatar==null ? 
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
              />
            :
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={{uri: avatar}}
              />
            }
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
            <Touchable onPress={()=>setbottomModalAndTitle(true)}>
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
          
            <Tag>
              <ScrollView
               horizontal={true}
               showsHorizontalScrollIndicator={false}
              >
                {details.length >=1 ? (details.map((k,index)=>
                <TagBox key={index}>
                  <TagText>{k}</TagText>
                </TagBox>
                )) : null}
                <View/>
              </ScrollView>
            </Tag>
          
          <StoreInfo>
            <Store>
            <Touchable onPress={() => navigation.navigate("StoreDetail", { storeName, placeId })}>
              <StoreName>{storeName}</StoreName>
            </Touchable>
            <Rating>
                <Stars
                  default={rating}
                  count={5}
                  half={true}
                  disabled={true}
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
        
        <Modal.BottomModal
            visible={bottomModalAndTitle}
            onTouchOutside={() => setbottomModalAndTitle(false)}
            
            width={0.8}
            onSwipeOut={() => setbottomModalAndTitle(false)}
          >
            <ModalContent>
              {user.isSelf ? 
              <> 
              <ModalButtonTest onPress ={() => {}}>
                <Text style={{fontSize:19}}>
                  수정
                </Text>
              </ModalButtonTest>
              <ModalButtonTest onPress ={() => handleDelete()}>
                <Text style={{fontSize:19, color : 'red'}}>
                  삭제
                </Text>
              </ModalButtonTest>
              </>
              :
              <>
              <ModalButtonTest onPress ={() => handleUnfollow()}>
                <Text style={{fontSize:17, color : 'red'}}>
                  팔로우 취소
                </Text>
              </ModalButtonTest>
              </>
             } 
            </ModalContent>
            <ModalFooter>
              <ModalButton
                text="CANCEL"
                onPress={() => setbottomModalAndTitle(false)}
              />
            </ModalFooter>
          </Modal.BottomModal>
          <Modal
            visible={modalAndTitle}
            onTouchOutside={() => setmodalAndTitle(false)}
            height={0.3}
            width={0.8}
            onSwipeOut={() => setmodalAndTitle(false)}
          >
            <ModalContent>
              <Text>삭제하시겠습니까?</Text>
            </ModalContent>
            <ModalFooter>
              <ModalButton
                text="CANCEL"
                onPress={() => setmodalAndTitle(false)}
              />
              <ModalButton
                text="OK"
                onPress={() => handleSubmit()}
              />
            </ModalFooter>
          </Modal>
        
      </Card>
  );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired,
      isSelf: PropTypes.bool
    }).isRequired,
    files: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    ).isRequired,
    details: PropTypes.array,
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
