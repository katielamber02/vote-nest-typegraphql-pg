// import {
//     createBottomTabNavigator,
//     NavigationContainer
// } from "react-navigation";
// import PollScreen from "../screens/PollScreen";
// import ProfileScreen from "../screens/ProfileScreen";
// import { Stack } from "../types/stack";

// const HomeTabNavigator = (stack: Stack): NavigationContainer => {
//     switch (stack) {
//         case "UnAuth":
//             return createBottomTabNavigator({
//                 Poll: PollScreen
//             });
//             break;
//         case "App":
//             return createBottomTabNavigator({
//                 Poll: PollScreen,
//                 Profile: ProfileScreen
//             });
//             break;
//     }
// };

// export default HomeTabNavigator;


import {
    createBottomTabNavigator,
    NavigationContainer
} from "react-navigation";
import PollScreen from "../screens/PollScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { ROUTES, Stack } from "../types/stack";

const HomeTabNavigator = (stack: Stack): NavigationContainer => {
    switch (stack) {
        case ROUTES.RootUnAuth:
            return createBottomTabNavigator({
                [ROUTES.HomePoll]: PollScreen
            });
        case ROUTES.RootApp:
            return createBottomTabNavigator({
                [ROUTES.HomePoll]: PollScreen,
                [ROUTES.HomeProfile]: ProfileScreen
            });
    }
};

export default HomeTabNavigator;