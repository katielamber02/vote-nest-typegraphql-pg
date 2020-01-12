// import { createDrawerNavigator } from "react-navigation";
// import HomeStackNavigator from "./HomeStackNavigator";

// const AppStack = createDrawerNavigator({
//     Home: HomeStackNavigator("App")
// });
// export default AppStack;

import { createDrawerNavigator } from "react-navigation";
import { ROUTES } from "../types/stack";
import MainStackNavigator from "./MainStackNavigator";

const AppStack = createDrawerNavigator({
    [ROUTES.AppMain]: MainStackNavigator(ROUTES.RootApp)
});
export default AppStack;