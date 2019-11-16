import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, TextInput } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";

const SEND_MESSAGE = gql`
  mutation sendMessage($text: String!) {
    sendMessage(text: $text) {
      id
      text
    }
  }
`;

const MESSAGES = gql`
  query messages {
    messages {
      id
      text
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      id
      text
    }
  }
`;

const ScrollView = styled.ScrollView``;

const Text = styled.Text``;

export default function MessageDetail({ navigation }) {
  const you = navigation.getParam("username");
  // const [message, setMessage] = useState("");
  // const sendMessageMutation = useMutation(SEND_MESSAGE, {
  //   variables: {
  //     text: message
  //   }
  // });
  // const { data: oldMessages } = useQuery(MESSAGES, { suspend: true });
  // const { data: newMessage, loading, error } = useSubscription(NEW_MESSAGE);
  // const [messages, setMessages] = useState(oldMessages.messages);
  // const updateMessages = () => {
  //   if (newMessage !== undefined) {
  //     const { newMessage: payload } = newMessage;
  //     setMessages(previous => [...previous, payload]);
  //   }
  // };
  // useEffect(() => {
  //   updateMessages();
  // }, [newMessage]);
  // const onChangeText = text => setMessage(text);
  // const onSubmit = async () => {
  //   setMessage("");
  //   if (message === "") {
  //     return;
  //   }
  //   try {
  //     await sendMessageMutation();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  return (
    <KeyboardAvoidingView behavior="padding" enabled style={{ flex: 1 }}>
      <ScrollView>
        {/* {messages.map(m => (
          <View key={m.id} style={{ marginBottom: 10 }}>
            <Text>{m.text}</Text>
          </View>
        ))} */}
        <Text>{you}</Text>
        <TextInput
          placeholder={"Type your message"}
          // onChangeText={onChangeText}
          // onSubmitEditing={onSubmit}
          returnKeyType="send"
          // value={message}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  )
};