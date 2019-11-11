import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View, TextInput} from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";
import styled from "styled-components";


const Touchable = styled.TouchableOpacity`
flex-direction: row;`;


const HeaderUserContainer = styled.View`
  margin-left: 10px;
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
        <AllView>
          <CaptionCon>
            <Touchable>
              <Image 
                style={{height: 20, width: 20, borderRadius:20}}
                source={{uri: user.avatar}}/>
                <Bold>{user.username}</Bold>
            </Touchable>
            <Caption>{text}</Caption>
            </CaptionCon> 
        </AllView>
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
