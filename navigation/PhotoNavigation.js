import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator} from "react-navigation-tabs"
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import styles from '../styles';
import { stackStyles } from "./config";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    Take:{
      screen: TakePhoto,
      navigationOptions:{
        tabBarLabel:"Take"
      }
    },
    Select:{
      screen: SelectPhoto,
      navigationOptions:{
        tabBarLabel:"Select"
      }
    },
    
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle:{
        backgroundColor: styles.blackColor,
        marginBottom:70
      },
      labelStyle:{
        color: styles.blackColor,
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
  Tabs : {
    screen: PhotoTabs,
    navigationOptions:{
      header: null
    }
  },
  UploadPhoto
},{
  defaultNavigationOptions:{
    headerStyle:{...stackStyles}
  }
});