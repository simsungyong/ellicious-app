import React, { useState, useMemo, useEffect } from "react";
import { KeyboardAvoidingView, TextInput, View, ScrollView, Text } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
// import withSuspense from "../../../components/withSuspense";
import Messages from "../Messages";
import constants from "../../../constants";

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $roomId: String!, $toId: String!) {
    sendMessage(message: $text toId: $toId roomId: $roomId) {
      id
      text
    }
  }
`;

const SEND_MESSAGE_WITHOUT_ROOMID = gql`
  mutation sendMessage($text: String!, $toId: String!) {
    sendMessage(message: $text toId: $toId) {
      id
      text
      room {
        id
      }
    }
  }
`;

const MESSAGES = gql`
  query seeRoom($roomId: String!) {
    seeRoom(id: $roomId) {
      messages {
        id
        text
        from {
          username
        }
      }
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

const MessageDetailPresenter = ({username, userId, roomId}) => {
  const [roomNum, setRoom] = useState(roomId);
  const [message, setMessage] = useState("");
  const [chat_message, setMessages] = useState();


  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      text: message,
      roomId: roomNum,
      toId: userId
    }
    
  });

  const [sendWithoutRoomId] = useMutation(SEND_MESSAGE_WITHOUT_ROOMID, {
    variables: {
        text: message,
        toId: userId
    }
  })

  if(roomNum !== undefined) {
    const { data, error, loading } = useQuery(
        MESSAGES,
        { variables: { roomId: roomNum }}
    );
    if(data !== undefined && chat_message == null) {
        setMessages(data.seeRoom.messages)
    }
  }

  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomNum
    }
  });

  const updateMessages = () => {
    if (newMessage !== undefined) {
      const { newMessage: payload } = newMessage;
      setMessages(previous => [...previous, payload]);
    }
  };

  useEffect(() => {
    updateMessages();
  }, [newMessage]);

  const onChangeText = text => setMessage(text);

  const onSubmit = async () => {
    setMessage("");
    if (message === "") {
      return;
    }
    try {
      if(roomNum !== undefined) {
        const {data:{sendMessage}}=await sendMessageMutation();
        console.log(sendMessage.text);
      } else {
        const {data:{sendMessage}}=await sendWithoutRoomId();
        console.log(sendMessage);
        if(setMessage !== undefined) {
            setRoom(setMessage.room.id);
        }
      }
      
      
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <View>
        <ScrollView style={{ height: constants.height / 1.3 }}>
          {chat_message==undefined ?
          null
          : (
            chat_message.map(m => (
              m.from.username === username ? (
                <View key={m.id} style={{ marginBottom: 10, alignItems: "flex-start", marginLeft: 10 }}>
                  <Text>{m.from.username}</Text>
                  <Text>{m.text}</Text>
                </View>
              ) : (
                <View key={m.id} style={{ marginBottom: 10, alignItems: "flex-end", marginRight: 10}}>
                  <Text>{m.from.username}</Text>
                  <Text>{m.text}</Text>
                </View>
              )
            ))
          )}
        </ScrollView>
        <TextInput
            placeholder={"Type your message"}
            onChangeText={onChangeText}
            onSubmitEditing={onSubmit}
            returnKeyType="send"
            value={message}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

MessageDetailPresenter.propTypes = {
    username: PropTypes.string,
    userId: PropTypes.string,
    roomId: PropTypes.string
};

export default MessageDetailPresenter;