import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import MyPick from "../screens/Tabs/MyPick";
import Profile from "../screens/Tabs/Profile";
import MessagesLink from "../components/MessagesLink";
import { View } from "react-native";
import AlarmsLink from "../components/AlarmsLink";

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });

/* 탭 내비게이션 메뉴 설정 */
export default createBottomTabNavigator({
  Home: {
    screen: stackFactory(Home, {
      title: "Ellicious",
      headerRight: <MessagesLink />,
      headerLeft : <AlarmsLink/>
    }),
    
  },
  Search: {
    screen: stackFactory(Search, {
      title: "Search"
    })
  },
  Add: {
    screen: View,
    navigationOptions: {
        tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation")
    }
  },
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile"
    })
  },
  MyPick: {
    screen: stackFactory(MyPick, {
      title: "MyPick"
    })
  }
});
