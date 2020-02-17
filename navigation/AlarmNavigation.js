import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import Alarms from "../screens/Alarm/Alarms";
import {View, Text} from 'react-native'
import { PointPink, TINT_COLOR } from "../components/Color";

export default createStackNavigator({
  Alarms: {
    screen: Alarms,
    navigationOptions: {
      headerTitle : (
        <View style = {{ alignItems : "center", flex : 1}}>
          <Text style = {{ fontSize : 30 , color : TINT_COLOR, fontWeight: "200"}}>
            Alarms 
          </Text>
        </View>
      )
    }
  },
});