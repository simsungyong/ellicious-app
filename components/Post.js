import React, { useState } from "react";
import { Image, Platform, TouchableOpacity,View, Modal, TouchableHighlight } from "react-native";
import styled from "styled-components";
import { Ionicons, EvilIcons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import moment from "moment";
import { IconColor, StarColor, TINT_COLOR, LightGrey, Line, mainPink } from '../components/Color';
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";
import Hr from "hr-native";
import { POST_FRAGMENT } from "../fragments";
import {ME} from '../screens/Tabs/Profile/Profile';
import { UNFOLLOW } from "./UserProfile";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import {GET_PICK} from '../screens/Tabs/MyPick/MyPick'
import Star from '../components/Star'
import {FEED_QUERY} from '../screens/Auth/AuthQueries'
import Loader from './Loader';
export const POST_QUERY = gql`
  {
    seeFeed {
      ...PostParts
    }
  }
  ${POST_FRAGMENT}
`;

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!, $toId: String) {
    toggleLike(postId: $postId, toId: $toId)
  }
`;
export const TOGGLE_PICK = gql`
  mutation togglePick($postId: String!, $toId: String) {
    togglePick(postId: $postId ,toId:$toId)
  }
`;
export const DELETE_POST = gql`
  mutation editPost($postId: String!) {
    editPost(id: $postId, action: DELETE){
      id
    }
  }
`;




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
const View1 = styled.View`
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



const Post = ({
    user, 
    storeLocation,
    storeName,
    storeLat,
    storeLong,
    placeId,
    files=[],
    id,
    details=[],
    likeCount: likeCountProp,
    caption,
    comments=[],
    isLiked: isLikedProp,
    navigation,
    commentCount,
    childCommentCount,
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
      const [isModal, setModal] = useState(false);
      const [subModal, setSubModal] = useState(false);
      
      const [toggleLikeMutaton] = useMutation(TOGGLE_LIKE, {
        variables: {
        postId: id,
        toId: user.id
        }});

      const [togglePickMutation] = useMutation(TOGGLE_PICK, {
        refetchQueries:()=>[{query: GET_PICK}]

      });
      
      const [deleteMutation] = useMutation(DELETE_POST, {
        refetchQueries: ()=>[{query: FEED_QUERY, variables:{
          pageNumber: 0,
          items: 8
        }},{query: ME}]
      });

      const [unFollowMutation] = useMutation(UNFOLLOW, {
        refetchQueries: ()=>[{query: FEED_QUERY, variables:{
          pageNumber: 0,
          items: 8
        }},{query: ME}]
      });

      
      const handlePost = (id, files, storeName, storeLocation, placeId)=> {
        try {
          setModal(false);
          navigation.navigate("UpdatePost", { 
            postId: id,
            photo: files,
            name: storeName,
            formatted_address: storeLocation,
            place_id: placeId
          })
        } catch (e) {
          console.log(e)
        }
      }
    
    const time = moment(createdAt).startOf('minute').fromNow();

    
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

    var lastTap = null;
    const handleDoubleTap = () => {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 200;
      if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
        handleLike();
      } else {
        lastTap = now;
        
      }
    }

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
            postId: id,
            toId:user.id
          },
        });
      }catch (e){
        console.log(e);
      }
    };
    const handleModal = ()=>{
      setModal(false);
      setSubModal(true);
    }

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
        setIsLoading(false);
        setSubModal(false);
      }
    }
    


    const modal = (
      <Modal
          visible={isModal}
          transparent={true}
        >
          <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.50)'
                }}
            >
                <View style={{
                    width: 250,
                    height: 150,
                    backgroundColor: 'white',
                    borderRadius: 20,
                }}>
                    <View
                        style={{
                            alignSelf: 'baseline',
                            backgroundColor: 'white',
                            width: 250,
                            flex: 4,
                            borderBottomLeftRadius: 20,
                            borderTopLeftRadius:20,
                            borderTopRightRadius:20,
                            borderBottomRightRadius: 20,
                        }}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => handlePost(id, files, storeName, storeLocation, placeId)}>
                                <Text style={{ color: 'black', fontSize: 15 }}>게시물 수정</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={handleModal}>
                            <Text style={{ color: 'black', fontSize: 15 }}>게시물 삭제</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:mainPink , borderBottomLeftRadius:20, borderBottomRightRadius:20}}
                            onPress={() => setModal(false)}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Cancel</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </Modal>
  )

  const modalEdit=(
    <Modal
          visible={subModal}
          transparent={true}
        >
          <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                    backgroundColor: 'rgba(0,0,0,0.50)'
                }}
            >
                <View style={{
                    width: 250,
                    height: 150,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    
                }}>

                   
                    <Text
                        style={{ fontSize: 16, alignSelf: 'center', marginTop: 40, flex: 7, alignItems:'center', justifyContent: 'center'}}
                    >
                        {"게시물을 삭제하시겠습니까?"}
                    </Text>
                    <View
                        style={{
                            alignSelf: 'baseline',
                            backgroundColor: mainPink,
                            width: 250,
                            flex: 4,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}
                            onPress={handleSubmit}>
                              {isloading ? <Loader/> : <Text style={{ color: 'white', fontSize: 15 }}>확인</Text>}
                                
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setSubModal(false)}>
                            <Text style={{ color: 'white', fontSize: 15 }}>취소</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </View>
        </Modal>
    )
  

    return (
      
      <Card>
        <Container>
          <Header>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserDetail", { id: user.id, username })
              }
            >
              {avatar==null ? 
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={require("../assets/defaultIcons.png")}
              />
            :
              <Image
                style={{height: 40, width: 40, borderRadius:15}}
                source={{uri: avatar}}
              />
            }
            </TouchableOpacity>
        
            <UserInfo>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserDetail", { id: user.id, username })
                }
              >
                <Bold>{user.username}</Bold>
              </TouchableOpacity>
              <CommentCount>{time}</CommentCount>
            </UserInfo>
            <View1/>
            {user.isSelf ? <TouchableOpacity onPress={()=>setModal(true)}>
              <IconCon>
                <MaterialCommunityIcons
                  color={IconColor}
                  size={25}
                  name={"dots-horizontal"}
                />
              </IconCon>
            </TouchableOpacity> : null}
            
          </Header>

          <CaptionCon>
            <Caption>{caption}</Caption>
          </CaptionCon>
          
          <Swiper 
            showsPagination={false}
            style={{height: constants.width/1}}>
            
              {files.map(file=>(
              <TouchableWithoutFeedback key={file.id} onPress={handleDoubleTap}>
                <Image
                  style={{width: constants.width, height:constants.width/1}}
                  
                  source={{uri: file.url}}/>
              </TouchableWithoutFeedback>
                
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
                <View1/>
              </ScrollView>
            </Tag>
          
          <StoreInfo>
            <Store>
            <TouchableOpacity onPress={() => navigation.navigate("StoreDetail", { storeName, placeId })}>
              <StoreName>{storeName}</StoreName>
            </TouchableOpacity>
            <Star rating={rating} size={25} color={StarColor}/>
            </Store>
          </StoreInfo>

          <LikeComments>
            <Text>{likeCount === 1 ? "좋아요 1개" : `좋아요 ${likeCount}개`}</Text>
            <TouchableOpacity onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: false})}>
              {comments.length >=1 ? (
                <Text> {`댓글 ${commentCount+childCommentCount}개`}</Text>
               ) : null}
            </TouchableOpacity>
            <Text>{pickCount === 1 ? "콕집기 1개" : `콕집기 ${pickCount}개`}</Text>
          </LikeComments>

          <Hr 
            lineStyle={{ backgroundColor : Line }}
          />

          <LikeCommentIcon>
          <TouchableOpacity onPress={handleLike}>
          <IconCon>
            <Ionicons
              size={25}
              color={isLiked ? mainPink : IconColor }
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
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate("CommentDetail",{caption, avatar, username, postId: id, focusing: true})}>
          <IconCon>
            <EvilIcons
              color={IconColor}
              size={30}
              name={Platform.OS === "ios" ? "comment" : "comment"}
            />
            <Text>댓글</Text>
          </IconCon>
        </TouchableOpacity>
      
        <TouchableOpacity onPress={handlePick}>
          <IconCon>
            <AntDesign
              color={isPicked ? mainPink : TINT_COLOR }
              size={20}
              name={isPicked ? "pushpin" : "pushpino" }
            />
            <Text>콕집기</Text>
          </IconCon>
        </TouchableOpacity>
          </LikeCommentIcon>
        </Container>
        
        
        {modal}
        {modalEdit}
      </Card>
  );
};

Post.propTypes = {
    id: PropTypes.string.isRequired,
    storeName: PropTypes.string.isRequired,
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
    commentCount: PropTypes.number.isRequired,
    childCommentCount:PropTypes.number.isRequired,
    isPicked: PropTypes.bool.isRequired,
    rating: PropTypes.number.isRequired,
    caption: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    category: PropTypes.shape({
        id: PropTypes.string.isRequired,
        categoryName: PropTypes.string.isRequired
    })
  };

  export default React.memo(withNavigation(Post));

 