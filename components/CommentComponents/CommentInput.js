import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, TextInput, Alert } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import moment from "moment";
import { EvilIcons } from "@expo/vector-icons";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Post";

const Touchable = styled.TouchableOpacity``;

const Container = styled.View`

`;

const CaptionCon = styled.View`
  flex-direction: row; 
  alignItems: center;
  margin-left : 15px;
  margin-top : 5px;
`;

const Caption = styled.Text`
`;




const CommentCount = styled.Text`
  opacity: 0.5;
  font-size: 13px;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;

const Timebox = styled.Text`
  opacity: 0.5;
  font-size: 10px;
  justifyContent : flex-end;
`;

const DELETE_COMMENT = gql`
  mutation editComment($id: String!) {
    editComment(id: $id, action: DELETE){
      id
    }
  }
`;

const CommentInput = ({
  id,
  user,
  headComment,
  post,
  text,
  isLiked,
  likeCount,
  createdAt,
  navigation
}) => {
  const time = moment(createdAt).startOf('hour').fromNow();
  // const [deleteComment] = useMutation(DELETE_COMMENT, {
  //   refetchQueries: () => [
  //     {
  //       query: GET_COMMENTS, variables: {
  //         postId: post.id, headComment: null
  //       }
  //     },
  //     { query: FEED_QUERY }
  //   ]
  // });

  const handleDelete = async () => {
  //   try {
  //     const { data: { editComment } } = await deleteComment({
  //       variables: {
  //         id: id
  //       }
  //     });
  //     if (editComment.id) {
  //       navigation.navigate("CommentDetail")
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     Alert.alert("삭제 에러!");

  //   }
  }


  return (
    <Container>
      <CaptionCon>
        <Touchable>
          <Image
            style={{ height: 25, width: 25, borderRadius: 15 }}
            source={{ uri: user.avatar }}
          />
        </Touchable>
        <Touchable>
          <Bold>{user.username}</Bold>
        </Touchable>
        <Caption>{text}</Caption>

        <Timebox>{time}</Timebox>

        {user.isSelf ?
          <Touchable onPress={handleDelete}>
            <EvilIcons name={"trash"} size={20} />
          </Touchable> : null}

      </CaptionCon>
    </Container>
  )
}


CommentInput.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  likeCount: PropTypes.number,
  isLiked: PropTypes.bool,
  text: PropTypes.string.isRequired,
  headComment: PropTypes.shape({
    id: PropTypes.string
  }),
  post: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  createdAt: PropTypes.string.isRequired
}

export default CommentInput;
