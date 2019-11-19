import React from "react";
import { Platform, Text, View, StyleSheet } from "react-native";
import styled from 'styled-components';
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
import { stackStyles, HomestackStyles, SearchstackStyles  } from "./config";
import CommentDetail from "../screens/CommentDetail";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";
import StoreDetail from "../screens/StoreDetail";
import { PointPink, TINT_COLOR, Grey, mainPink } from "../components/Color";
import MapContainer from '../screens/Map/MapContainer';
import { white } from "ansi-colors";
import { AntDesign } from "@expo/vector-icons";

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
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontSize : 30 , color : TINT_COLOR, fontWeight: "200"}}>
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
    },

    StoreDetail: {
      screen: StoreDetail,
      navigationOptions: ({ navigation }) => ({
        title: navigation.getParam("storeName")
      })
    }
  },
  {
    defaultNavigationOptions: {
        headerBackTitle: null,
        headerTintColor: styles.blackColor,
        //headerStyle: { ...stackStyles }
    }
  });

const HeaderRight = styled.View`
flex-direction : row;
  alignItems: center;
  justifyContent: center;
  marginTop : 10;
`;
const Title = styled.Text`
fontFamily : 'korElli';
fontSize : 40 ;
color : #f7f7f7;
`;
const Shadow = StyleSheet.create(
  {
      MainContainer:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
  
      },
  
      TextShadowStyle:
      {
         textAlign: 'center',
         fontSize: 40,
         textShadowColor: PointPink,
         textShadowOffset: { width: 1, height: 4 },
         textShadowRadius: 4
      
      }
  
  });
/* 탭 내비게이션 메뉴 설정 */
export default createBottomTabNavigator({
  
  Home: {
    screen: stackFactory(Home, {
     // title: "Ellicious",
      headerRight: (
        <HeaderRight>
          <MessagesLink />
          <AlarmsLink/>
        </HeaderRight>
        ),
        headerLeft : (
          <View style = {{ alignItems : "flex-start", flex : 1, padding : 5,  marginLeft : 5, marginTop : 10}}>
            <Title style={Shadow.TextShadowStyle}>
              Ellicious
            </Title>
          </View>
        ),
        headerStyle: HomestackStyles 
     /* headerTitle : (
        <View style = {{ alignItems : "flex-start", flex : 1, padding : 5,  marginLeft : 5, backgroundColor:'red'
        }}>
          <Text style = {{ fontFamily : 'korElli', fontSize : 35 , color : PointPink}}>
            Ellicious
          </Text>
        </View>
      ) */
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
          <AntDesign
            focused={focused}
            color={focused ? mainPink : Grey}
            name={Platform.OS === "ios" ? "home" : "home"}
            size={27}
          />
      )
    }
  },
  Search: {
    screen: stackFactory(Search, {
      headerBackTitle: null,
      headerStyle: SearchstackStyles 
    }),
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
          <AntDesign
            size={27}
            color={focused ? mainPink : Grey}
            focused={focused}
            name={Platform.OS === "ios" ? "search1" : "search1"}
          />
      )
    }
  },
  Add: {
    screen: View,
    headerStyle: stackStyles,
    navigationOptions: {
        tabBarOnPress: ({ navigation }) => navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({ focused }) => (
          <AntDesign
            color={focused ? mainPink : Grey}
            focused={focused}
            size={28}
            name={Platform.OS === "ios" ? "pluscircleo" : "pluscircleo"}
          />
      )
    }
  },
  Profile: {
    screen: stackFactory(Profile, {
      headerStyle: stackStyles,
      title: "프로필",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontSize : 30 , color : PointPink, fontWeight: "200"}}>
            Profile
          </Text>
        </View>
      )
    }),
    navigationOptions: {
        tabBarIcon: ({ focused }) => (
            <AntDesign
              size={28}
              color={focused ? mainPink : Grey}
              focused={focused}
              name={Platform.OS === "ios" ? "user" : "user"}
            />
        )
    }
  },
  MyPick: {
    screen: stackFactory(MyPick, {
      headerStyle: stackStyles ,
      title: "MyPick",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontSize : 30 , color : PointPink, fontWeight: "200"}}>
           MyPick
          </Text>
        </View>
      )
    }),
    navigationOptions: {
        tabBarIcon: ({ focused }) => (
            <AntDesign
              focused={focused}
              color={focused ? mainPink : Grey}
              name={
                Platform.OS === "ios"
                  ? focused
                    ? "pushpin"
                    : "pushpino"
                  : focused
                  ? "pushpin"
                  : "pushpino"
              }
              size={27}
            />
        )
    }
  },
},
{
  tabBarOptions: {
    showLabel: false,
    style : {
      //backgroundColor : mainPink
    }
}  
}
);
