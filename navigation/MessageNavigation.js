import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import MessageRoom from "../screens/Messages/MessageRoom";
import MessageDetail from "../screens/Messages/MessageDetail";

export default createStackNavigator({
  Messages: {
    screen: Messages,
    navigationOptions: {
      headerTitle: "Message"
    }
  },
  MessageDetail: {
    screen: MessageDetail,
    navigationOptions: ({ navigation }) => ({
      title: navigation.getParam("username")
    })
  },
  MessageRoom
});