import React, { useState, useMemo, useEffect } from "react";
import { KeyboardAvoidingView, TextInput, View,Text, ScrollView, TextComponent } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
// import withSuspense from "../../../components/withSuspense";
import Messages from "../Messages";
import constants from "../../../constants";
import { LightPink, TINT_COLOR, LightGrey, mainPink } from "../../../components/Color";
import { Feather, EvilIcons } from "@expo/vector-icons";


const Container = styled.View`
height : ${constants.height}
`;
const TextBox = styled.View`
  background-color : ${LightPink}
  border-radius : 5px
  padding-vertical: 5px;
  padding-horizontal : 10px;
  margin-top:3px;
`;
const TextMSG = styled.Text`
  font-size : 20px;
  color : ${TINT_COLOR};
`;
const MSG = styled.View`
flex-direction:row;
`;
const Img = styled.View`
margin-right : 3px;
`;
const TextCon = styled.View`
`;
const Image=styled.Image`
height: 25
width: 25
borderRadius:7.5
margin-right : 2px;
`;

const Input=styled.TextInput`
height : 30px;
width : ${constants.width-45}
border-radius : 10
padding : 5px;
`;
const InputCon=styled.View`
alignItems: center;
justifyContent: center;
padding : 10px;
flex-direction:row
background-color : ${LightGrey}
`;
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
      <Container>
        <ScrollView style={{ height : constants.height / 1.2 }}>
          {chat_message==undefined ?
          null
          : (
            chat_message.map(m => (
              m.from.username === username ? (
                <MSG key={m.id} style={{ marginBottom: 10, alignItems: "flex-start", marginLeft: 10 }}>
                  <Img>
                  <Image 
                    source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
                  />
                  </Img>
                  <TextCon>
                    <Text>{m.from.username}</Text>
                    <TextBox>
                      <TextMSG>{m.text}</TextMSG>
                    </TextBox>
                  </TextCon>
                </MSG>
              ) : (
                <View key={m.id} style={{ marginBottom: 10, alignItems: "flex-end", marginRight: 10}}>
                  <TextBox>
                    <TextMSG>{m.text}</TextMSG>
                  </TextBox>
                </View>
              )
            ))
          )}
        </ScrollView>

        <InputCon>
          <Input
              placeholder={"Type your message"}
              onChangeText={onChangeText}
              onSubmitEditing={onSubmit}
              returnKeyType="send"
              value={message}
              backgroundColor={'white'}
          />
          <EvilIcons
          name={'arrow-up'}
          color={mainPink}
          size={35}
          />
        </InputCon>
      </Container>
    </KeyboardAvoidingView>
  );
}

MessageDetailPresenter.propTypes = {
    username: PropTypes.string,
    userId: PropTypes.string,
    roomId: PropTypes.string
};

export default MessageDetailPresenter;