import React, { useState, useMemo, useEffect } from "react";
import Platform, { KeyboardAvoidingView, TextInput, View,Text, ScrollView, TextComponent, TouchableOpacity, Alert, RefreshControl } from "react-native";
import styled from "styled-components";
import { useMutation, useQuery, useSubscription } from "react-apollo-hooks";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Loader from "../../../components/Loader";
import constants from "../../../constants";
import { LightPink, TINT_COLOR, LightGrey, mainPink } from "../../../components/Color";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { SEE_ROOMS } from '../Messages';


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
background-color : white
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
      from {
        username
      }
    }
  }
`;

export const MESSAGES = gql`
  query seeRoom($roomId: String) {
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
  subscription newMessage($roomId: String) {
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
  const [roomNum, setRoomNum] = useState(roomId);
  const [message, setMessage] = useState("");
  const [chat_message, setMessages] = useState();
  const [refreshing, setRefreshing] = useState(false);
  
  const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
    variables: {
    text: message,
    roomId: roomNum,
    toId: userId
    }
  });

  const [sendMessageWithoutRoomIdMutation] = useMutation(SEND_MESSAGE_WITHOUT_ROOMID, {
    variables: {
    text: message,
    toId: userId
    }, refetchQueries:()=>[{query: SEE_ROOMS}]
  });



  const { data, refetch } = useQuery(
    MESSAGES, {
      variables: { 
        roomId: roomNum
      }, suspend: true
    }
  );

  if(data !== undefined && chat_message == null && data.seeRoom !== undefined) {
    setMessages(data.seeRoom.messages)
    console.log("a");
  }

  const { data: newMessage } = useSubscription(NEW_MESSAGE, {
      variables: {
      roomId: roomNum
      }, suspend: true
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
      setMessage("")
      if (message === "") {
        return;
      }
      try {
        if(roomNum !== "") {
          await sendMessageMutation();
        } else {
          const {data} = await sendMessageWithoutRoomIdMutation();
          setRoomNum(data.sendMessage.room.id);
        }
      } catch (e) {
        console.log(e);
      }
  };

  const refresh = async() => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (e) {
      console.log(e)
    } finally {
      setRefreshing(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} enabled>
        <ScrollView
        style={{ height : constants.height / 1.32 }}
        refreshControl= {
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        >
        {chat_message==undefined ?
        null
        : (
            chat_message.map(m => (
            m.from.username === username ? (
                <MSG key={m.id} style={{ marginBottom: 10, alignItems: "flex-start", marginLeft: 10 }}>
                <Img>
                {m.avatar==null ? 
                    <Image
                    source={{uri: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AAInJR1.img?h=400&w=300&m=6&q=60&o=f&l=f&x=509&y=704"}}
                    />
                :
                    <Image
                    source={{uri: avatar}}
                    />
                }
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
        />
        <EvilIcons
        name={'arrow-up'}
        color={mainPink}
        size={35}
        onSubmit={onSubmit}
        />
        </InputCon>
    </KeyboardAvoidingView>
  );
}

  MessageDetailPresenter.propTypes = {
      username: PropTypes.string,
      userId: PropTypes.string,
      roomId: PropTypes.string
  };

  export default MessageDetailPresenter;