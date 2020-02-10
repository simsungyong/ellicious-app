import React, { useState, useEffect } from "react";
import { View, Alert,AsyncStorage } from "react-native";
import PropTypes from "prop-types";
import { useQuery, useSubscription, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import MainNavigation from "../navigation/MainNavigation";
import User from "../User";

const ME = gql`
    {
        me {
            id
            username
            avatar
        }
    }
`;


const Subscribe = () => {
  const [userId, setUserId] = useState("")
  const [roomId, setRoomId] = useState("")
  const [messageOK, setMessageOK] = useState(false)

  const { data } = useQuery(ME);
  // if (data && userId == "") {
  //   // AsyncStorage.setItem('userId', data.me.id);
  //   // AsyncStorage.setItem('username', data.me.username);
  // }
  const getUser = async()=>{
    await AsyncStorage.setItem('userId', data.me.id);
    await AsyncStorage.setItem('username', data.me.username);
    User.userId = await AsyncStorage.getItem('userId')
    User.username = await AsyncStorage.getItem('username')
    console.log(User.username)
  }
  useEffect(()=>{
    if(data){
      getUser();
    }
  },[data])
  
  return <MainNavigation />
}

export default Subscribe;