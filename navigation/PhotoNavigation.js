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
  Tabs : {
    screen: PhotoTabs,
    navigationOptions:{
      title:"사 진",
      headerBackTitle: "뒤로"
    }
  },
  Upload: {
    screen: UploadPhoto,
    navigationOptions:{
      title: "New Post",
      headerBackTitle:null,
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