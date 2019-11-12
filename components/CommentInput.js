import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, TextInput} from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import styled from "styled-components";


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

const CommentInput=({
    id,
    user,
    text,
    isLiked,
    likeCount,
    createdAt,
    navigation
})=>{
    return(
        <Container>
          <CaptionCon>
            <Touchable>
                <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            </CaptionCon> 
        </Container>
    )
}


CommentInput.propTypes={
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
      }).isRequired,
    likeCount: PropTypes.number,
    isLiked: PropTypes.bool,
    text: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,

}

export default CommentInput;
