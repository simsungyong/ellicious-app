import React,{useState} from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { POST_COMMENT } from "../fragments";
import CommentInput from "../components/SubComment";
import PostOfComment from '../components/PostOfComment';

const InfoCon=styled.View`
    flex:1;
`;
const Touchable = styled.TouchableOpacity`
    flex:1;
    `;

const CaptionCon = styled.View`
  flex:1;
`;
const CommentBox =styled.View`
    flex-direction:row;
    margin-bottom: 5px;
`
const Caption = styled.Text`
`;

const Reply = styled.TextInput`
  flex:1;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;


const GET_COMMENTS = gql`
    query seeComment($postId: String!, $headComment: String){
        seeComment(postId: $postId, headComment: $headComment){
            ...CommentParts
        }
    }
    ${POST_COMMENT}
`;





export default ({navigation})=>{
    const {loading, data} = useQuery(GET_COMMENTS, {
        variables: { postId: navigation.getParam("postId"), headComment: null}
    });
    const focusing = navigation.getParam("focusing")
    const caption = navigation.getParam("caption");
    const textInput = useInput("");
    //const caption = navigation.getParam("caption");
    const avatar = navigation.getParam("avatar");
    const username = navigation.getParam("username");
    return (
                <InfoCon>
                <ScrollView scrollEnabled={false}>
                <CaptionCon>
                    <Image 
                            style={{height: 20, width: 20, borderRadius:20}}
                            source={{uri: avatar}}/>
                            <Bold>{username}</Bold>
                            <Text>{caption}</Text>
                </CaptionCon>
                <CommentBox>
                <TextInput
                    {...textInput}
                     returnKeyType="send"
                     //onSubmitEditing={handleLogin}
                     autoFocus={focusing}
                     placeholder="Comment"
                     />
                <Touchable>
                    <Bold>Reply</Bold>
                </Touchable>
                </CommentBox>
            {loading ? (
                <Loader/>
            ) : (
                data && data.seeComment && data.seeComment.filter(comment=>comment.headComment==null).map(comment=><PostOfComment 
                    key={comment.id}{...comment}
                    />)
            )}
        
        <KeyboardSpacer/>
        </ScrollView>  
        </InfoCon>
    )
}



