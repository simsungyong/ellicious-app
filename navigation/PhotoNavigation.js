import React from 'react';
import {Text, View} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator} from "react-navigation-tabs"
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import MapContainer from '../screens/Map/MapContainer';
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { PhotostackStyles } from "./config";
import { PointPink, TINT_COLOR, mainPink } from "../components/Color";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Take:{
      screen: TakePhoto,
      navigationOptions:{
        tabBarLabel:"Take",
      }
    },
    Select:{
      screen: SelectPhoto,
      navigationOptions:{
        tabBarLabel:"Select"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle:{
        backgroundColor: PointPink,
        marginBottom:65
      },
      labelStyle:{
        color: PointPink,
        fontWeight:"600"
      },
      style:{
        paddingBottom:20,
        ...PhotostackStyles
      }
    }
  }
);

export default createStackNavigator({
  Tabs : {
    screen: PhotoTabs,
    navigationOptions:{
      title:"사 진",
      headerBackTitle: null ,
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontSize : 25 , color : TINT_COLOR, fontWeight : "200"}}>
            사 진
          </Text>
        </View>
      )
    }
  },
  Upload: {
    screen: UploadPhoto,
    navigationOptions:{
      title: "새 게시글",
      headerBackTitle:null,
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontSize : 22 , color : TINT_COLOR, fontWeight : "200"}}>
            새 게시글
          </Text>
        </View>
      )
    }
  },
  
  Map: {
    screen: MapContainer,
    navigationOptions:{
      title: "방문한 맛집은?",
      headerBackTitle:null,
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontSize : 22 , color : TINT_COLOR, fontWeight : "200"}}>
            방문한 맛집은?
          </Text>
        </View>
      )
    }
  }
},
{
  defaultNavigationOptions:{
    headerStyle:{
      ...PhotostackStyles
    },
    headerTintColor:TINT_COLOR,
  }
});