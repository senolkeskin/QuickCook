import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from "react-navigation";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthLoading from "../pages/AuthLoading";
import Menus from "../pages/Menus";
import Cart from "../pages/Cart";

const MainStack = createStackNavigator(
  {
    Home: { screen: Home },
    Menus: { screen: Menus },
    Cart: {screen: Cart},
  },
  {
    initialRouteName: "Home",
  }
);

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login }
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      AuthStack: AuthStack,
      MainStack: MainStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);