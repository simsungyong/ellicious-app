import React, { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import PropTypes from "prop-types";
import { useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import MainNavigation from "../navigation/MainNavigation";
import {MESSAGES} from "../screens/Messages/MessageDetail/MessageDetailPresenter";
import {SEE_ROOMS} from "../screens/Messages/Messages"

const ME = gql`
    {
        me {
            id
        }
    }
`;

const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
      from {
        username
      }
    }
  }
`;

const NEW_ROOM = gql`
  subscription newRoom($id: String!) {
    newRoom(id: $id) {
      id
    }
  }
`;

const Subscribe = () => {
  const [OK, setOK] = useState(false)
  const [roomOK, setRoomOK] = useState(false)
  const [messageOK, setMessageOK] = useState(false)
  const [userId, setUserId] = useState("")

  const { data } = useQuery(ME);
  if(data && userId=="") {
      setUserId(data.me.id);
  }

  useEffect(() => {
      startSubscription()
  }, userId)

  const startSubscription = async() => {
      if(userId!=="") {
          setOK(true);
      }
  }
  
  const { data: newRoom } = useSubscription(NEW_ROOM, {
      variables: {
      id: userId
      }, suspend: true, skip: !OK
  });
  const { data: data2, refetch:refetch2 } = useQuery(SEE_ROOMS, { skip: roomOK });
  if(data2) {
    setRoomOK(true);
  }
  if(newRoom && roomOK) {
    refetch2().then(() => {setRoomOK(false)})
  }


  // const { data: newMessage } = useSubscription(NEW_MESSAGE, {
  //   variables: {
  //   roomId: "ck6btbokqj4nh0b091x707mxr"
  //   }, suspend: true, skip: !OK
  // });
  // const { data:data3, refetch:refetch3 } = useQuery(
  //   MESSAGES, {
  //     variables: { 
  //       roomId: "ck6btbokqj4nh0b091x707mxr"
  //     }, suspend: true, skip: messageOK
  //   }
  // );
  // if(data3) {
  //   setMessageOK(true);
  // }
  // if(newMessage && messageOK) {
  //   refetch3().then(()=> {setMessageOK(false)})
  // }
    
    


    return <MainNavigation />
}

export default Subscribe;