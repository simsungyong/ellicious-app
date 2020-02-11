import { createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import SignupName from "../screens/Auth/Signup/SignupName";
import SignupPhone from "../screens/Auth/Signup/SignUpPhone";
import SignupID from "../screens/Auth/Signup/SignUpID";
import SignupCheckInfo from "../screens/Auth/Signup/SignUpCheckInfo";
import SignupPW from "../screens/Auth/Signup/SignUpPW";
import SignupFin from "../screens/Auth/Signup/SignUpFin";
import Confirm from "../screens/Auth/Confirm";
import AuthHome from "../screens/Auth/AuthHome";
import EmailCheck from "../screens/Auth/EmailCheck";

const AuthNavigation = createStackNavigator(
  {
    AuthHome,
    SignupName,
    Confirm,
    EmailCheck,
    SignupPhone,
    SignupID,
    SignupCheckInfo,
    SignupPW,
    SignupFin
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(AuthNavigation);