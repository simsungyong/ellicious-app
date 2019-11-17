import React from 'react';
import {Text, View} from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator} from "react-navigation-tabs"
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import MapContainer from '../screens/Map/MapContainer';
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import { PointPink, TINT_COLOR } from "../components/Color";

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
        ...stackStyles
      }
    }
  }
);

export default createStackNavigator({
  Upload: {
    screen: UploadPhoto,
    navigationOptions:{
      title: "New Post",
      headerBackTitle:null,
    }
  },
  Tabs : {
    screen: PhotoTabs,
    navigationOptions:{
      title:"사 진",
      headerBackTitle: "뒤로",
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1, padding : 5,  marginLeft : 5}}>
          <Text style = {{ fontSize : 25 , color : PointPink, fontWeight : "bold"}}>
            사 진
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
    }
  }
},
{
  defaultNavigationOptions:{
    headerStyle:{
      ...stackStyles
    },
    headerTintColor:TINT_COLOR,
  }
});