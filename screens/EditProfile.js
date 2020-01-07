import React,{useState} from "react";
import { useQuery,useMutation } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import Loader from "../components/Loader";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { ScrollView, Text,Image,TextInput,RefreshControl, KeyboardAvoidingView,Alert, TouchableOpacity, View, StyleSheet  } from "react-native";
import { POST_COMMENT } from "../fragments";
import PostOfComment from '../components/CommentComponents/PostOfComment';
import { LightGrey, CommentsBox, mainPink, TINT_COLOR } from "../components/Color";
import { withNavigation } from "react-navigation";


   

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
        );
      }

    
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