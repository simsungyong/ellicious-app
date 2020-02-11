import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SignUpName from "../screens/Auth/SignUpName";
import SignUpPhone from "../screens/Auth/SignUpPhone";
import SignUpCheckInfo from "../screens/Auth/SignUpCheckInfo";
import SignUpPW from "../screens/Auth/SignUpPW";
import SignUpFin from "../screens/Auth/SignUpFin";
import SignUpID from "../screens/Auth/SignUpID";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";
import EmailCheck from "../screens/Auth/EmailCheck";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    SignUpName,
    Confirm,
    EmailCheck,
    SignUpPhone,
    SignUpID,
    SignUpCheckInfo,
    SignUpPW,
    SignUpFin
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);