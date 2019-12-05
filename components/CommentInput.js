import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, TextInput} from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import moment from "moment";



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

const CommentInput=({
    id,
    user,
    text,
    isLiked,
    likeCount,
    createdAt,
    navigation
})=>{
    const time=moment(createdAt).startOf('hour').fromNow();

    return(
        <Container>
          <CaptionCon>
            <Touchable>
                <Image 
                    style={{height: 25, width: 25, borderRadius:15}}
                    source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}
                  />
            </Touchable>
            <Touchable>
                <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            
            <Timebox>{time}</Timebox>
            
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
