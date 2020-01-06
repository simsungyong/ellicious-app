import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import { Alert } from "react-native";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,RefreshControl, KeyboardAvoidingView } from "react-native";
import { POST_COMMENT } from "../fragments";
import PostOfComment from '../components/CommentComponents/PostOfComment';
import { LightGrey, CommentsBox, mainPink } from "../components/Color";
import constants from "../constants";

const InfoCon=styled.View`
  flex:1;
  margin-top : 8px;
`;
const Touchable = styled.TouchableOpacity``;

const CaptionCon = styled.View`
  flex:1;
  flex-direction: row;
  alignItems: center;
`;
const CommentBox =styled.View`
  flex-direction:row;
  margin-bottom: 10px;
  alignItems: center;
  margin-left : 5px;
  margin-right : 2px;
  margin-top : 7px;
`;
const Bold = styled.Text`
  font-weight: 600;
  font-size : 15px;
  margin-right : 5px;
`;
const TextBox = styled.View`
  background-color : ${CommentsBox};
  border-radius: 4px;
  justifyContent: center;
  padding : 5px;
  flex : 1;
  margin-right : 5px;
  margin-left : 5px;
  height : 30;
`;

const GET_COMMENTS = gql`
    query seeComment($postId: String!, $headComment: String){
        seeComment(postId: $postId, headComment: $headComment){
            ...CommentParts
        }
    }
    ${POST_COMMENT}
`;

const ADD_COMMENTS = gql`
    mutation addComment($text: String!, $headComment: String, $postId: String! ){
      addComment(text: $text, headComment: $headComment, postId:$postId)
    }
`

export default ({navigation})=>{
    const [refreshing, setRefreshing] = useState(false);
    const textInput = useInput("");
    const postId = navigation.getParam("postId");
    const focusing = navigation.getParam("focusing");
    const caption = navigation.getParam("caption");
    const avatar = navigation.getParam("avatar");
    const username = navigation.getParam("username");

    const {loading, data, refetch} = useQuery(GET_COMMENTS, {
        variables: { postId, headComment:null}
    });
    const [addComment] = useMutation(ADD_COMMENTS, {
      variables: {
        postId: postId,
        headComment: null,
        text: textInput.value
      }
    });
    
    //console.log(data.seeComment);
    const refresh = async() =>{
        try{
          setRefreshing(true);
          await refetch();
          
        }catch (e){
          console.log(e);
        }finally{
          setRefreshing(false);
        }
      };

    
    /*const handleComment = async()=>{
      const { value: text } = textInput;
      if (text === "") {
        return Alert.alert("한 글자는 쓰지?");
      }

      try {
        const {
          data: { addComment }
        } = await addComment();
        if (addComment) {
          Alert.alert("댓글 성공!");
        }
      } catch (e) {
        console.log(e);
        Alert.alert("댓글 에러!");
        
      } finally {
        
      }
    };*/
    
    return (
      <InfoCon>
        <ScrollView 
          scrollEnabled={true} 
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
          <CaptionCon>
            <Image 
              style={{height: 20, width: 20, borderRadius:10}}
              source={{uri: avatar}}/>
            <Bold>{username}</Bold>
            <Text>{caption}</Text>
          </CaptionCon>

          <CommentBox>
            <Image 
                style={{height: 30, width: 30, borderRadius:15}}
                source={{uri: "https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png"}}/>
            <TextBox>
              <TextInput
                {...textInput}
                returnKeyType="send"
                //onSubmitEditing={handleLogin}
                autoFocus={focusing}
                placeholder="Comment"
              />
            </TextBox>
            <Touchable>
              <Bold>Reply</Bold>
            </Touchable>
          </CommentBox>
            {loading ? (
              <Loader/>
            ) : (
              data && data.seeComment && data.seeComment.filter(comment=>comment.headComment == null).map(comment=>
              <PostOfComment 
              key={comment.id}{...comment}
              />)
            )}
          <KeyboardSpacer/>
        </ScrollView>  
      </InfoCon>
    )
}



