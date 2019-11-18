import { createStackNavigator } from "react-navigation-stack";
import Alarms from "../screens/Alarm/Alarms";

export default createStackNavigator({
  Alarms: {
    screen: Alarms,
    navigationOptions: {
      headerTitle: "Alarms"
    }
  },
});