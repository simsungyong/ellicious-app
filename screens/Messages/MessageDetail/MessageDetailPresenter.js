import React, { useState, useMemo, useEffect } from "react";
import { KeyboardAvoidingView, TextInput, View, ScrollView, Text } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
// import withSuspense from "../../../components/withSuspense";

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $roomId: String!, $toId: String!) {
    sendMessage(message: $text toId: $toId roomId: $roomId) {
      id
      text
    }
  }
`;

const MESSAGES = gql`
  query seeRoom($roomId: String!) {
    seeRoom(id: $roomId) {
      messages {
        id
        text
      }
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage($roomId: String!) {
    newMessage(roomId: $roomId) {
      id
      text
    }
  }
`;

const MessageDetailPresenter = ({username, userId, roomId}) => {
  const [message, setMessage] = useState("");
  const [chat_message, setMessages] = useState();


  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
      text: message,
      roomId: roomId,
      toId: userId
    }
  });

  const { data, error, loading } = useQuery(
    MESSAGES,
    // { suspend: true },
    { variables: { roomId: roomId }}
  );
  if(!loading)console.log(data.seeRoom.messages);
  if(data !== undefined && chat_message == null) {
      setMessages(data.seeRoom.messages)
  }

  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomId
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
      await sendMessageMutation();
    } catch (e) {
      console.log(e);
    }
  };

    


  return (
    <KeyboardAvoidingView behavior="padding" enabled>
        
            <ScrollView>
            {chat_message==undefined ? null : (chat_message.map(m => (
              <View key={m.id} style={{ marginBottom: 10 }}>
                <Text>{m.text}</Text>
              </View>
             )))}
            <Text>{username}</Text>
            <Text>{roomId}</Text>
            <Text>{userId}</Text>
            <TextInput
              placeholder={"Type your message"}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmit}
              returnKeyType="send"
              value={message}
            />
          </ScrollView>
       
      
    </KeyboardAvoidingView>
  );
}

MessageDetailPresenter.propTypes = {
    username: PropTypes.string,
    userId: PropTypes.string,
    roomId: PropTypes.string
};

export default MessageDetailPresenter;