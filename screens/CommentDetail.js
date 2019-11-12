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
import PostOfComment from '../components/PostOfComment';
import styles from "../styles";

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
                  <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <ScrollView scrollEnabled={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh}/>
        }>
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
                     autoCorrect={false}
                     returnKeyType="send"
                     //onSubmitEditing={handleComment}
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
                data && data.seeComment && data.seeComment.filter(comment=>comment.headComment == null).map(comment=><PostOfComment 
                    key={comment.id}{...comment}
                    />)
            )}
        
        
        </ScrollView>  
        </KeyboardAvoidingView>
        </InfoCon>
    )
}



