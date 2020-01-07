import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,RefreshControl, KeyboardAvoidingView,Alert, TouchableOpacity, View  } from "react-native";
import { POST_COMMENT } from "../fragments";
import PostOfComment from '../components/CommentComponents/PostOfComment';
import { LightGrey, CommentsBox, mainPink, TINT_COLOR } from "../components/Color";



const Container = styled.View`
  flex : 1`
  ;

const Header = styled.View`
      background-color: ${mainPink},
      height:200px
      `;

const UserId = styled.Text`
      font-size:22,
      color: ${TINT_COLOR},
      font-weight: 600`;

const Body = styled.View`
      margin-top: 40px,
`;

const BodyContent = styled.View`
      flex: 1,
      alignItems: center,
      padding:30px`;

const info = styled.Text`
      font-size:16,
      margin-top:10px`;

const description = styled.Text`
      font-size:16,
      margin-top:10px
      `;

   

export default ({navigation})=>{
        return (
          <Container>
          </Container>
        );
      }
    
    