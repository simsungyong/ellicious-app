import React,{useState} from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,KeyboardAvoidingView, Keyboard, Alert } from "react-native";
import { POST_COMMENT } from "../fragments";
import CommentInput from "../components/CommentInput";
import PostOfComment from '../components/PostOfComment';

const InfoCon=styled.View`
    flex:1;
`;
const Touchable = styled.TouchableOpacity``;

const CaptionCon = styled.View`
  flex-direction: row;
  flex:1;
`;
const CommentBox =styled.View`
    
    justify-content: flex-end;
    margin-bottom: 5px;
`
const Caption = styled.Text`
`;

const Reply = styled.Text`
  font-weight: 300;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;

const Bold = styled.Text`
  font-weight: 600;
  margin-bottom : 5px;
  font-size : 15px;
  margin-right : 5px;
`;


const GET_COMMENTS = gql`
    query seeComment($postId: String!){
        seeComment(postId: $postId){
            ...CommentParts
        }
    }
    ${POST_COMMENT}
`;





export default ({navigation})=>{
    const {loading, data} = useQuery(GET_COMMENTS, {
        variables: { postId: navigation.getParam("postId")}
    });

    const [isReply, setIsReply] = useState(true);
    const caption = navigation.getParam("caption");
    const textInput = useInput("");
    const avatar = navigation.getParam("avatar");
    const username = navigation.getParam("username");
   
    const handleClick =()=>setIsReply(true);

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
            {loading ? (
                <Loader/>
            ) : (
                data.seeComment.map(comment=>
                    <CaptionCon key={comment.id}>
                        <Touchable>
                            <Bold>{comment.user.username}</Bold>
                        </Touchable>
                        <Caption>{comment.text}</Caption>
                        <Touchable onPress={handleClick}>
                            <Reply>답글달기</Reply>
                        </Touchable>
                    </CaptionCon>)
               // data && data.seeComment && data.seeComment.map(comment=><PostOfComment key={comment.id}{...comment}/>)
            )}

        
        <CommentBox>
                <CommentInput
                    {...textInput}
                     returnKeyType="send"
                     //onSubmitEditing={handleLogin}
                     autoFocus={isReply}
                     placeholder="Comment"
                     />
                <Touchable>
                    <Bold>Reply</Bold>
                </Touchable>
        </CommentBox>
        <KeyboardSpacer/>
        </ScrollView>  
        </InfoCon>
    )
}



