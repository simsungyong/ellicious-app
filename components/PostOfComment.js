import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, TextInput} from "react-native";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import { Ionicons, FontAwesome, EvilIcons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { useMutation } from "react-apollo-hooks";
import styles from "../styles";
import moment from "moment";
import {TINT_COLOR, StarColor} from './Color';
import Loader from '../components/Loader'
import { POST_COMMENT } from "../fragments";
import { withNavigation } from "react-navigation";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
  } from 'react-native-modals';
import CommentInput from './CommentInput';



const Touchable = styled.TouchableOpacity`
flex-direction: row;`;
const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;

const Reply = styled.Text`
  
`;

const Caption = styled.Text`
`;
const AllView = styled.View`
`;

const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;
const CaptionCon = styled.View`
  flex-direction: row;
`;

const GET_COMMENTS = gql`
    query seeComment($postId: String!, $headComment: String){
        seeComment(postId: $postId, headComment: $headComment){
            ...CommentParts
        }
    }
    ${POST_COMMENT}
`;


const PostOfComment = ({
    id,
    headComment,
    post,
    text,
    user,
    likeCount: likeCountProp,
    isLiked: isLikedProp,
    navigation,
    createdAt,
    }) => {

        const {loading, data} = useQuery(GET_COMMENTS, {
         variables: { postId: post.id, headComment: id}
        });
        const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
        const navi = ()=>{
          setbottomModalAndTitle(false);
          navigation.navigate("UserDetail", { id: user.id, username:user.username });
        }

        return (
        <AllView>
            <CaptionCon>
            <Touchable onPress={navi}>
              <Image 
                style={{height: 20, width: 20, borderRadius:20}}
                source={{uri: user.avatar}}/>
                <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            <Touchable onPress={()=>setbottomModalAndTitle(true)}>
                <Reply>reply</Reply>
            </Touchable>  
            </CaptionCon>

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
          <CaptionCon>
          <Touchable
            onPress={navi}
          >
          <Image 
            style={{height: 40, width: 40, borderRadius:20}}
            source={{uri: user.avatar}}/>
        
              <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            </CaptionCon>
            { loading ? (<Loader/>) : (
              data && data.seeComment && data.seeComment.map(comment=>
              <CommentInput
                key={comment.id}{...comment}/>)
            )}
            <TextInput
              returnKeyType="send"
              autoFocus={true}
              placeholder="Comment"
            />
            <KeyboardSpacer/>
          </ModalContent>
        </Modal.BottomModal>
        </AllView>
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
