import React, { Component } from "react";
import { GiftedChat } from 'react-native-gifted-chat';
import Platform, { KeyboardAvoidingView, TextInput, View, Text, ScrollView, TextComponent, TouchableOpacity, Alert, RefreshControl } from "react-native";
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
const Image = styled.Image`
height: 25
width: 25
borderRadius:7.5
margin-right : 2px;
`;

const Input = styled.TextInput`
height : 30px;
width : ${constants.width - 45}
border-radius : 10
padding : 5px;
background-color : white
`;
const InputCon = styled.View`
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


export default class MessageDetailPresenter2 extends Component {
  state = {
    messages: [],
  };

  componentWillMount() {
    const { data, refetch } = useQuery(
      MESSAGES, {
      variables: {
        roomId: roomNum
      }
    })


    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://i.pinimg.com/originals/39/cd/e2/39cde2d77b272cfc6816ead14a47232c.png',
          },
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={(messages) => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}