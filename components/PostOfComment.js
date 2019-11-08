import React, { useState } from "react";
import { Image, Platform, StyleSheet,Text } from "react-native";
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
import {Card} from 'native-base'
import { withNavigation } from "react-navigation";
import Modal, {
    ModalTitle,
    ModalContent,
    ModalFooter,
    ModalButton,
  } from 'react-native-modals';

const Touchable = styled.TouchableOpacity``;
const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;

const Reply = styled.Text`
  font-weight: 300;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
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


const PostOfComment = ({
    id, 
    text,
    user,
    getHeadComment,
    headComment,
    likeCount: likeCountProp,
    isLiked: isLikedProp,
    navigation,
    createdAt,
    }) => {
        const avatar = user.avatar;
        const username = user.username;
        const [bottomModalAndTitle, setbottomModalAndTitle] = useState(false);
        
        
        const handleReply = ()=>{
            setbottomModalAndTitle(true);
        }

        return (
        <AllView>
            <CaptionCon>
            <Touchable>
                <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            <Touchable onPress={getHeadComment(headComment)}>
                <Reply>답글달기</Reply>
            </Touchable>
            

           
                
            </CaptionCon>
        </AllView>
        )
    }



PostOfComment.propTypes = {
    getHeadComment: PropTypes.func,
    id: PropTypes.string.isRequired,
    headComment: PropTypes.string,
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

  export default PostOfComment;