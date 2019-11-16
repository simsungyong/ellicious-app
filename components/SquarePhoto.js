import React from "react";
import { TouchableOpacity, Image,Text } from "react-native";
import { withNavigation } from "react-navigation";
import styled from "styled-components";
import PropTypes from "prop-types";
import constants from "../constants";
import { LightPink, TINT_COLOR, mainPink, IconColor, Grey } from "./Color";
import {MaterialCommunityIcons, Ionicons,EvilIcons, AntDesign } from "@expo/vector-icons";

const Post = styled.View`
background-color : ${LightPink}
padding : 3px;
margin-right : 2px;
margin-bottom : 2px;
`;

const Bold = styled.Text`
  font-weight: 200;
  font-size : 11;
  color : ${TINT_COLOR}
`;
const Imagecon = styled.View`
  alignItems: center;
  justifyContent: space-around;
  margin-top : 5px;
`;

const Icons = styled.View`
flex-direction: row;
margin-left : 5px
`;
const Icon = styled.View`
flex-direction: row;
alignItems: center;
justifyContent: center;
flex : 1;
`;

const SquarePhoto = ({ 
  navigation, 
  files = [], 
  id,
  commentCount,
  pickCount,
  likeCount,
}) => (
  <Post>
    <TouchableOpacity onPress={() => navigation.navigate("Detail", { id })}>
      <Image
        source={{ uri: files[0].url }}
        style={{ width: constants.width / 3, height: constants.height / 6 }}
      />
      <Imagecon>
        <Bold>#디저트 #공릉 #카페</Bold>
        <Icons>
          <Icon>
            <MaterialCommunityIcons 
              size={10} 
              name={"heart"}
              color={mainPink}/>
            <Bold>{likeCount}</Bold>
          </Icon>
          <Icon>
            <EvilIcons
              size={10} 
              name={"comment"}
              color={IconColor}/>
            <Bold>{commentCount}</Bold>
          </Icon>
          <Icon>
            <AntDesign 
              size={8} 
              name={"pushpin"}
              color={Grey}/>
            <Bold>{pickCount}</Bold>
          </Icon>
        </Icons>

      </Imagecon>
    </TouchableOpacity>
  </Post>
);

SquarePhoto.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  id: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  pickCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
};

export default withNavigation(SquarePhoto);