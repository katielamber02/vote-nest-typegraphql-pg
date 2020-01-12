// import { createDrawerNavigator } from "react-navigation";
// import LoginScreen from "../screens/LoginScreen";
// import SignupScreen from "../screens/SignupScreen";
// import HomeStackNavigator from "./HomeStackNavigator";

// const UnAuthStack = createDrawerNavigator({
//     Home: HomeStackNavigator("UnAuth"),
//     Login: LoginScreen,
//     Signup: SignupScreen
// });

// export default UnAuthStack;

import { createDrawerNavigator } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import { ROUTES } from "../types/stack";
import MainStackNavigator from "./MainStackNavigator";

const UnAuthStack = createDrawerNavigator({
    [ROUTES.UnAuthMain]: MainStackNavigator(ROUTES.RootUnAuth),
    [ROUTES.UnAuthLogin]: LoginScreen,
    [ROUTES.UnAuthSignup]: SignupScreen
});

export default UnAuthStack;