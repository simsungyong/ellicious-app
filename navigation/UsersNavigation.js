import { createStackNavigator } from "react-navigation-stack";
import { createMaterialTopTabNavigator} from "react-navigation-tabs"
import Followers from "../screens/ViewUserLIst/Followers";
import Following from "../screens/ViewUserLIst/Following";
import { UserstackStyles } from "./config";
import { PointPink, TINT_COLOR } from "../components/Color";

const UsersTabs = createMaterialTopTabNavigator(
    {
        Following:{
            screen: Following,
            navigationOptions:{
                tabBarLabel: "팔로잉",
            }
        },
        Followers:{
            screen: Followers,
            navigationOptions:{
                tabBarLabel:"팔로우"
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
            ...UserstackStyles
          }
        }
      }
);

export default createStackNavigator({
    Tabs: {
        screen: UsersTabs,
        navigationOptions: ({navigation})=>({
            title: navigation.getParam("username"),
        }) 
        }
    },
    {
        defaultNavigationOptions:{
            headerStyle:{
              ...UserstackStyles
            },
            headerTintColor:TINT_COLOR,
          }
    }
)