import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";

import MapContainer from '../screens/Map/MapContainer';
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { PhotostackStyles } from "./config";
import { TINT_COLOR, mainPink } from "../components/Color";





export default createStackNavigator({
  Map: {
    screen: MapContainer,
      navigationOptions: {
      title: "",
        headerBackTitle: null,
          headerTitle: (
            <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, padding: 5, marginLeft: 5 }}>
              <Text style={{ fontSize: 22, color: TINT_COLOR, fontWeight: "200" }}>
                방문한 맛집은?
            </Text>
            </View>
          )
    }
  },
  Upload: {
    screen: UploadPhoto,
    navigationOptions: ({ navigation }) => ({
      title: "",
      headerBackTitle: null,
      headerTitle: (
        <View style={{ justifyContent: 'center', alignItems: "center", flex: 1, padding: 5, marginLeft: 5 }}>
          <Text style={{ fontSize: 22, color: TINT_COLOR, fontWeight: "200" }}>
            게시글
          </Text>
        </View>
      )
    })
  },
},
{
  defaultNavigationOptions: {
    headerStyle: {
        ...PhotostackStyles
    },
    headerTintColor: TINT_COLOR,
    }
});