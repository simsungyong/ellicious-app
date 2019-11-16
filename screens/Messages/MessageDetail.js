import React, { useState, useMemo, useEffect } from "react";
import { KeyboardAvoidingView, TextInput, View, ScrollView, Text } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";

import withSuspense from "../../components/withSuspense";

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!, $roomId: String!, $toId: String!) {
    sendMessage(message: $text toId: $userId roomId: $roomId) {
      id
      text
    }
  }
`;

const MESSAGES = gql`
  query seeRoom($roomId: String!) {
    seeRoom(id: $roomId) {
      messages {
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

export default ({navigation})  => {
  const you = navigation.getParam("username");
  const roomId = navigation.getParam("roomId");
  const userId = navigation.getParam("userId");
  

  const [message, setMessage] = useState("");
  const sendMessageMutation = useMutation(SEND_MESSAGE, {
    variables: {
      text: message,
      roomId: roomId,
      toId: userId
    }
  });
  const { data: oldMessages } = useQuery(
    MESSAGES,
    // { suspend: true },
    { variables: { roomId: roomId }}
  );
  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
    variables: {
      roomId: roomId
    }
  });
  const [messages, setMessages] = useState(oldMessages.seeRoom.messages);
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
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
      <ScrollView>
        {messages.map(m => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))}
        <Text>{you}</Text>
        <Text>{roomId}</Text>
        <TextInput
          placeholder={"Type your message"}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmit}
          returnKeyType="send"
          value={message}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
