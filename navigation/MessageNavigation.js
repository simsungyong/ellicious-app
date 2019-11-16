import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import Messages from "../screens/Messages/Messages";
import MessageRoom from "../screens/Messages/MessageRoom";
import Message from "../screens/Messages/Message";
import constants from "../constants";
import styles from "../styles";
import { LightGrey } from "../components/Color";

export default createStackNavigator({
  Messages: {
    screen: Messages,
    navigationOptions: {
      headerTitle: (
        <TextInput
          style={{
              width: constants.width - 40,
              height: 35,
              backgroundColor: LightGrey,
              padding: 10,
              borderRadius: 5,
              textAlign: "center"
          }}
          returnKeyType="search"
          placeholder={"Search"}
          placeholderTextColor={styles.darkGreyColor}
        />
      )
    }
  },
  Message,
  MessageRoom
});