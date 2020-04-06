import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { useQuery, useSubscription } from "react-apollo-hooks";
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

const NEW_ALARM = gql`
    subscription newAlarm($id: String) {
      newAlarm (id: $id) {
        check
        category
        from {
          username
        }
      }
    }
`;


const Subscribe = () => {
  const [isSkip, setIsSkip] = useState(false);
  const [userId, setUserId] = useState("");

  const { data } = useQuery(ME);
  
  
  const getUser = async()=>{
    await setUserId(data.me.id);
    await setIsSkip(true);
    await AsyncStorage.setItem('userId', data.me.id);
    await AsyncStorage.setItem('username', data.me.username);
    if(data.me.avatar !== null){
      await AsyncStorage.setItem('avatar', data.me.avatar)
    }
    
    User.userId = await AsyncStorage.getItem('userId')
    User.username = await AsyncStorage.getItem('username')
    User.avatar = await AsyncStorage.getItem('avatar')
  }

  const {data: newAlarm} = useSubscription(NEW_ALARM, {
    variables: {
      id: userId
    }, skip: !isSkip
  })

  useEffect(()=>{
    if(data){
      getUser();
      
    }
  },[data])

  useEffect(() => {
    if(newAlarm) {
      refetch()
    }
  }, [newAlarm])
  
  return <MainNavigation />
}

export default Subscribe;