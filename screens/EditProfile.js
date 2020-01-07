import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,TextInput,RefreshControl, KeyboardAvoidingView,Alert, TouchableOpacity, View, StyleSheet  } from "react-native";
import { POST_COMMENT } from "../fragments";
import PostOfComment from '../components/CommentComponents/PostOfComment';
import { PointPink, CommentsBox, mainPink, TINT_COLOR, Grey, LightPink } from "../components/Color";
import { withNavigation } from "react-navigation";
import constants from "../constants";
import { FormLabel, FormInput } from 'react-native-elements'
import {AntDesign} from '@expo/vector-icons'

const Container = styled.View`
flex : 1;
padding : 10px;
`;

const EditImage = styled.View`
  flex : 4
  alignItems: center;
  justifyContent: center;
`;
const ImageCon = styled.TouchableOpacity`
`;

const Image = styled.Image`
  width: 80;
  height: 80;
  borderRadius:30;
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

`;
const EditProfile=({
    id,
    avatar,
    username,
    fullName,
    categories,
    navigation,
    categoryCount,
    bio
})=>{
    return (
      <Container>
        <EditImage>
          <ImageCon>
            <Image  
              source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
            />
          </ImageCon>
          <EditButton>
            <EditId style={{fontSize : 30, fontWeight : "200"}}>
              0._.min
            </EditId>
          </EditButton>
        </EditImage>

        <EditInfo>
          <EditName>
            <Text style={{fontSize : 17, color : PointPink}}>이름</Text>
            <TextInput 
              style={{ 
                height: 26,
                width: constants.width-20, 
                fontSize: 20, 
                color: TINT_COLOR, 
                borderBottomWidth: 1, 
                borderBottomColor: mainPink 
              }}
            placeholderTextColor={Grey}
            />
          </EditName>
          <EditText>
          <Text style={{fontSize : 17, color : PointPink, marginTop : 13}}>소개</Text>
            <TextInput 
              style={{ 
                height: 26,
                width: constants.width-20, 
                fontSize: 20, 
                color: TINT_COLOR, 
                borderBottomWidth: 1, 
                borderBottomColor: mainPink, 
              }}
            placeholderTextColor={Grey}
            />
          </EditText>
        </EditInfo>
        <EditCage>
          <Text style={{fontSize : 17, color : PointPink, marginTop : 13}}>카테고리</Text>
          <EditCageDetail>
            
            <TextInput 
              style={{
                marginTop: 15,
              }}
              placeholder = '디져트 지배자'
              placeholderTextColor={TINT_COLOR}
              placeholderTextSize = '50'
            />
          </EditCageDetail>  
          </EditCage>
      </Container>
        );
      }
//사진 누르면 사진 앨범 뜨게, 이름 누르면 이름 바꿀 수 있도록 ->현재 둘다 버튼임 
    
const styles = StyleSheet.create({
        header:{
            height:100,
        },
        editbox:{
            marginTop:60,
            alignItems: 'center'
          },
        editImage:{
            fontSize:16,
            color: mainPink,
            fontWeight: "600"
          },
        avatar: {
          width: 130,
          height: 130,
          borderRadius: 63,
          borderWidth: 4,
          borderColor: "white",
          marginBottom:10,
          alignSelf:'center',
          position: 'absolute',
          marginTop:30
        },
        name:{
          fontSize:22,
          color:"#FFFFFF",
          fontWeight:'600',
        },
        body:{
        },
        bodyContent: {
          flex: 1,
          alignItems: 'center',
          padding:30,
        },
        name:{
          fontSize:28,
          color: "#696969",
          fontWeight: "600"
        },
        info:{
          fontSize:16,
          color: "#00BFFF",
          marginTop:10
        },
        description:{
          fontSize:16,
          color: "#696969",
          marginTop:10,
          textAlign: 'center'
        },
        buttonContainer: {
          marginTop:10,
          height:45,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom:20,
          width:250,
          borderRadius:30,
          backgroundColor: "#00BFFF",
        },
      });

export default withNavigation(EditProfile);


/* 
<View style={styles.container}>
          <View style={styles.header}></View>
          <Image 
            style={styles.avatar}  
            source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
            />
            <View style={styles.editbox}>
            <TouchableOpacity>
            <Text style={styles.editImage}>수정</Text>
            </TouchableOpacity>  
            </View>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
            
    <Text style={styles.name}>유저 아이디</Text>
    <Text style={styles.info}>풀 네임</Text>
    <Text style={styles.description}>소개글~~~</Text>
              
              
            </View>
        </View>
      </View>

*/
