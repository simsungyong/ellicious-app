import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import MyPick from "../screens/Tabs/MyPick";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import MessagesLink from "../components/MessagesLink";
import { View } from "react-native";
import NavIcon from "../components/NavIcons";
import AlarmsLink from "../components/AlarmsLink";
import { stackStyles } from "./config";
import CommentDetail from "../screens/CommentDetail";
import styles from "../styles";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
      title: "Photo"
      }
    },
  CommentDetail: {
    screen: CommentDetail,
    navigationOptions: ({ navigation }) => ({
      title: "댓 글"
    })
  }
},
  {
    defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        headerStyle: { ...stackStyles }
    }
  });

/* 탭 내비게이션 메뉴 설정 */
export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Ellicious",
      headerRight: <MessagesLink />,
      headerLeft : <AlarmsLink/>,
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-home" : "md-home"}
          />
      )
    }
  },
  Search: {
    screen: stackFactory(Search, {
      headerBackTitle: null
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios" ? "ios-search" : "md-search"}
          />
      )
    }
  },
  Add: {
    screen: View,
    navigationOptions: {
        tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <NavIcon
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          />
      )
    }
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile"
    }),
    navigationOptions: {
        tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={Platform.OS === "ios" ? "ios-person" : "md-person"}
            />
        )
    }
  },
  MyPick: {
    screen: stackFactory(MyPick, {
      title: "MyPick"
    }),
    navigationOptions: {
        tabBarIcon: ({ focused }) => (
            <NavIcon
              focused={focused}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "ios-heart"
                    : "ios-heart-empty"
                  : focused
                  ? "md-heart"
                  : "md-heart-empty"
              }
            />
        )
    }
  }
});
