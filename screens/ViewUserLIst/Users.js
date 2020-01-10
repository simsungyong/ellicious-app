import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../../components/Loader";
import styled from "styled-components";
import useInput from "../../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,TextInput,RefreshControl, KeyboardAvoidingView, TouchableOpacity, StyleSheet  } from "react-native";
import { POST_COMMENT } from "../../fragments";
import { PointPink, CommentsBox, mainPink, TINT_COLOR, Grey, LightPink } from "../../components/Color";
import { withNavigation } from "react-navigation";
import constants from "../../constants";
import { FormLabel, FormInput } from 'react-native-elements'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import { FEED_QUERY } from "../Tabs/Home";
import {ME} from '../Tabs/Profile/Profile';
import Followers from "./Followers";
import Following from "./Following";

import TopBarNav from "top-bar-nav";

export const EDIT_USER = gql`
  mutation editUser($newAvatar: String, $bio: String, $username: String) {
    editUser(avatar: $newAvatar bio: $bio username: $username){
      id
    }
  }
`;

const Container = styled.View`
flex : 1;
padding : 15px;
`;

const View = styled.View`
flex:1
`;
const EditImage = styled.View`
  height : 30%;
  alignItems: center;
  justifyContent: center;
`;
const ImageCon = styled.View`
`;

const Image = styled.Image`
  width: 95;
  height: 95;
  borderRadius:30;
  position : relative;
`;
const EditButton = styled.TouchableOpacity`
alignItems: center;
justifyContent: center;
`;
const EditId = styled.Text`
margin-top : 5px;
`;

const EditInfo = styled.View`
  flex : 2.5;
  alignItems: center;
  justifyContent: center;
  
`;
const EditName = styled.View`
`;
const EditText = styled.View``;
const EditCage = styled.View`
flex : 4
`;
const EditCageDetail = styled.View`
flex-direction : row;
margin-right : 10px;
alignItems: center;
justifyContent: center;
`;
const Button = styled.TouchableOpacity`
  right : 0px;
  bottom: 0px;
  justify-content: center;
  align-items: center;
  position: absolute;
  
`;
export default class extends React.Component{

    render() {
        const Scene = ({ index }) => (
          <View style={{ flex: 1, justifyContent: 'center'}}>
            {
              (index == 0) ? 
                <Followers/>
                :
                <Following/>
              }
          </View>
        );
        
        const ROUTES = {
          Scene
          // ideally you would have a ROUTES object with multiple React component scenes
        };
        
        // There are three types of labels (image, text, and element)
        const ROUTESTACK = [
          // { image: require('../'), title: 'Scene' },
          { text: <Text>팔로워</Text>, title: 'Scene' },
          // { element: <Text>World</Text>, title: 'Scene' },
          { text: <Text>팔로잉</Text>, title: 'Scene' }
        ];
    
        return (
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <TopBarNav
              routeStack={ROUTESTACK}
              renderScene={(route, i) => {
                let Component = ROUTES[route.title];
                return <Component index={i} />;
              }}
              // headerStyle={[styles.headerStyle, { paddingTop: 30 }]} // probably want to add paddingTop if using TopBarNav for the  entire height of screen to account for notches/status bars
              // labelStyle={styles.labelStyle}
              // underlineStyle={styles.underlineStyle}
              // imageStyle={styles.imageStyle}
              headerStyle={{ paddingTop: 20 }}
              //sidePadding={40}
              inactiveOpacity={1}
              fadeLabels={true}
              underlineStyle={Style.underlineStyle}
            />
          </View>
        )
      }
    }
    
    const Style = StyleSheet.create ({
      underlineStyle: {
        height: 3.6,
        backgroundColor: mainPink,
        width: constants.width / 2
      }
    })