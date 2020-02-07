import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import PropTypes from "prop-types";
import { useQuery, useSubscription, useMutation } from "react-apollo-hooks";
import gql from "graphql-tag";
import MainNavigation from "../navigation/MainNavigation";
import {MESSAGES, MessageDetailPresenter} from "../screens/Messages/MessageDetail/MessageDetailPresenter";
import {SEE_ROOMS} from "../screens/Messages/Messages"

const ME = gql`
    {
        me {
            id
        }
    }
`;

const NEW_MESSAGE = gql`
  subscription newMessage($userId: String) {
    newMessage(userId: $userId) {
      id
      text
      from {
        username
      }
      room {
        id
      }
    }
  }
`;


const Subscribe = () => {
  const [userId, setUserId] = useState("")
  const [roomId, setRoomId] = useState("")
  const [messageOK, setMessageOK] = useState(false)

  const { data } = useQuery(ME);
  if(data && userId=="") {
      setUserId(data.me.id);
  }

  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
    variables: {
      userId: userId
    }, suspend: true
  });
  const { data: data2, refetch:refetch2 } = useQuery(SEE_ROOMS);
  
  
  const update = async() => {
    if(userId!=="" && newMessage !== undefined) {
      try {
        await refetch2();
        const { data: data3,  refetch:refetch3 } = useQuery(
          MESSAGES, {
            variables: {
              roomId: newMessage.newMessage.room.id
            }
          }
        ).then(refetch3);
      } catch (e) {
        console.log(e)
      } finally {
        console.log("hello!")
      }
    }
  }
  
  

  useEffect(() => {
    update();
  }, [newMessage])
  
    


    return <MainNavigation />
}

export default Subscribe;