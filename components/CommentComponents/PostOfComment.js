import React, { useState } from "react";
import { Image, ScrollView,Alert, TextInput, Text } from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { Ionicons, FontAwesome, EvilIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import useInput from "../../hooks/useInput";
import { gql } from "apollo-boost";
import constants from "../../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../../styles";
import moment from "moment";
import {LightPink, Grey, mainPink, LightGrey, CommentsBox} from '../Color';
import Loader from '../Loader'
import { POST_COMMENT } from "../../fragments";
import { withNavigation } from "react-navigation";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal, {ModalTitle, ModalContent, ModalFooter, ModalButton} from 'react-native-modals';
import CommentInput from './CommentInput';
import { FEED_QUERY } from "../Post";

const Touchable = styled.TouchableOpacity`
  margin-bottom:3px;
`;
const Container = styled.View`
  margin-left : 5px;
`;

const CaptionsCon = styled.View`
  flex-direction: row;
  margin-top : 5px;
`;

const Profile = styled.View`
  margin-right : 5px;
`;

const CommentCon = styled.View`
  flex : 1;
`;

const Comment = styled.View`
  background-color : ${LightPink};
  border-radius: 4px;
  justifyContent: center;
  padding : 5px;
  margin-right : 5px;
  height : 30;
`;
const Caption = styled.Text``;

const ReplyCon = styled.View`
  flex-direction: row;
  justifyContent: space-between;
  margin-right : 5px;
  margin-left : 7px;
`;

const Reply = styled.Text`
  color : ${Grey};
`;
const TICon = styled.View`
flex : 1;
background-color : ${LightGrey};
padding : 5px;
`;

const Timebox = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const TextInputCon=styled.View`
 margin-left : 5px;
 padding : 10px;
 flex-direction : row;
 justifyContent: center;
 margin-right : 5px;
`;

const CommentBox =styled.View`
  flex-direction:row;
  margin-bottom: 10px;
  alignItems: center;
  margin-left : 5px;
  margin-right : 2px;
  margin-top : 7px;
`;
const Bold = styled.Text`
  font-weight: 600;
  font-size : 15px;
  margin-right : 5px;
`;
const TextBox = styled.View`
  background-color : ${CommentsBox};
  border-radius: 4px;
  justifyContent: center;
  padding : 5px;
  flex : 1;
  margin-right : 5px;
  margin-left : 5px;
  height : 30;
`;

const GET_COMMENTS = gql`
    query seeComment($postId: String!, $headComment: String){
        seeComment(postId: $postId, headComment: $headComment){
            ...CommentParts
        }
    }
    ${POST_COMMENT}
`;

const ADD_COMMENTS = gql`
    mutation addComment($text: String!, $headComment: String, $postId: String! ){
      addComment(text: $text, headComment: $headComment, postId:$postId){
        id
        text
      }
    }
`

const PostOfComment = ({
    id,
    post,
    text,
    user,
    likeCount: likeCountProp,
    isLiked: isLikedProp,
    navigation,
    createdAt,
    }) => {
        const time=moment(createdAt).startOf('hour').fromNow();

        const {loading, data, refetch} = useQuery(GET_COMMENTS, {
         variables: { postId: post.id, headComment: id}
        });
        const [isLoading, setIsLoading] = useState(false);
        const [addComments] = useMutation(ADD_COMMENTS, {
          refetchQueries:()=>[
            {query:GET_COMMENTS, variables:{ 
              postId: post.id, headComment: null}},
              {query:GET_COMMENTS, variables:{
                postId: post.id, headComment: id
              }},
              {query: FEED_QUERY}
            ]
        });
        const commentInput = useInput();
        const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
        const navi = ()=>{
          setbottomModalAndTitle(false);
          navigation.navigate("UserDetail", { id: user.id, username:user.username });
        }
        const handleComment = async()=>{
          if (commentInput.value === undefined) {
            Alert.alert("한 글자는 쓰지?");
          }else{
            setIsLoading(true);
            try {
              const {data:{addComment}} = await addComments({
                variables: {
                  postId: post.id,
                  headComment: id,
                  text: commentInput.value
                }
              });
              if(addComment.id){
                navigation.navigate("CommentDetail")
                
              }
          }catch (e) {
            console.log(e);
            Alert.alert("댓글 에러!");
            
          } finally {
            setIsLoading(false);
          }
        }
          
    };
        return (
          <Container>
            {loading ? null : (
            <CaptionsCon>
              <Profile>
                <Image 
                  style={{height: 30, width: 30, borderRadius:15}}
                  source={{uri: user.avatar}}
                />
              </Profile>

              <CommentCon>
                <Touchable onPress={navi}>
                  <Bold>{user.username}</Bold>
                </Touchable>

                <Comment>
                  <Caption>{text}</Caption>
                </Comment>
                <ReplyCon>
                  <Timebox>{time}</Timebox>
                  {data.seeComment.length > 0 ? (
                    <Timebox>{"+"+data.seeComment.length+"개"}</Timebox>
                  ) : null }
                  <Touchable onPress={()=>setbottomModalAndTitle(true)}>
                    <Reply>Reply </Reply>
                  </Touchable>
                </ReplyCon>
              </CommentCon>
            </CaptionsCon>
            )}
          <Modal.BottomModal
            visible={bottomModalAndTitle}
            onTouchOutside={() => setbottomModalAndTitle(false)}
            height={0.7}
            width={1}
            onSwipeOut={() => setbottomModalAndTitle(false)}
            modalTitle={
              <ModalTitle
                title="댓글" 
                hasTitleBar
              />
            }
          >
            <ModalContent>
              <CaptionsCon>
                <Profile>
                  <Image 
                    style={{height: 40, width: 40, borderRadius:20}}
                    source={{uri: user.avatar}}
                  />
                </Profile>

                <CommentCon>
                  <Touchable onPress={navi}>
                    <Bold>{user.username}</Bold>
                  </Touchable>

                  <Comment>
                    <Caption>{text}</Caption>
                  </Comment>

                  <ReplyCon>
                    <Timebox>{time}</Timebox>
                    
                  </ReplyCon>
                </CommentCon>
              </CaptionsCon>

                {
                  data && data.seeComment && data.seeComment.map(comment=>
                  <CommentInput
                    key={comment.id}{...comment}/>)
                }

          <CommentBox>
            <TextBox>
              <TextInput
                onChangeText={commentInput.onChange}
                returnKeyType="send"
                value={commentInput.value}
                onSubmitEditing={handleComment}
                placeholder="Comment"
              />
            </TextBox>
            <Touchable onPress={handleComment}>
              {isLoading ? <Loader/> : 
              <Bold>Reply</Bold>  }
            </Touchable>
          </CommentBox>

                <KeyboardSpacer/>
            </ModalContent>
          </Modal.BottomModal>
        </Container>
        )    
      }



PostOfComment.propTypes = {
    id: PropTypes.string.isRequired,
    childComment: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired
        }).isRequired
      })
    ),
    headComment: PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired
        }).isRequired
    }),
    post: PropTypes.shape({
      id:PropTypes.string.isRequired
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
    likeCount: PropTypes.number,
    isLiked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  };

  export default withNavigation(PostOfComment);
