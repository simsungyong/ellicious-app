import React from "react";
import { Platform, Text, View } from "react-native";
import { createBottomTabNavigator } from "react-navigation-tabs"
import { createStackNavigator } from 'react-navigation-stack';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import MyPick from "../screens/Tabs/MyPick";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NavIcons";
import AlarmsLink from "../components/AlarmsLink";
import { stackStyles } from "./config";
import CommentDetail from "../screens/CommentDetail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";
import { PointPink, TINT_COLOR } from "../components/Color";
import MapContainer from '../screens/Map/MapContainer';

const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    },
    Detail: {
      screen: Detail,
      navigationOptions: {
      title: "Photo",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontSize : 20 , color : TINT_COLOR, fontWeight : "bold"}}>
            Post
          </Text>
        </View>
      )
      }
    },
    
    CommentDetail: {
      screen: CommentDetail,
      navigationOptions: ({ navigation }) => ({
        title: "댓 글"
      })
    },
    UserDetail: {
      screen: UserDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("username")
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
  Home: {
    screen: stackFactory(Home, {
      title: "Ellicious",
      headerRight: <MessagesLink />,
      headerLeft : <AlarmsLink/>,
      headerTitle : (
        <View style = {{ alignItems : "flex-start", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontFamily : 'elli', fontSize : 35 , color : PointPink}}>
            Ellicious
          </Text>
        </View>
      )
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
  
  Profile: {
    screen: stackFactory(Profile, {
      title: "Profile",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontFamily : 'elli', fontSize : 30 , color : PointPink}}>
            Profile
          </Text>
        </View>
      )
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
      title: "MyPick",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontFamily : 'elli', fontSize : 35 , color : PointPink}}>
           MyPick
          </Text>
        </View>
      )
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
