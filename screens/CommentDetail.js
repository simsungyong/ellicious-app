import React,{useState} from "react";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,RefreshControl } from "react-native";
import { POST_COMMENT } from "../fragments";
import PostOfComment from '../components/PostOfComment';
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
  margin-bottom: 5px;
  alignItems: center;
  margin-left : 5px;
  margin-right : 5px;
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
  width: ${constants.width / 1.32};
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


export default ({navigation})=>{
    const [refreshing, setRefreshing] = useState(false);
    const {loading, data, refetch} = useQuery(GET_COMMENTS, {
        variables: { postId: navigation.getParam("postId"), headComment:null}
    });
    const focusing = navigation.getParam("focusing")
    const caption = navigation.getParam("caption");
    const textInput = useInput("");
    const avatar = navigation.getParam("avatar");
    const username = navigation.getParam("username");

    console.log(data);
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



