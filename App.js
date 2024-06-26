import React, {useEffect}from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import AppNavigation from './src/navigations/AppNavigation';
import * as SecureStore from "expo-secure-store";
export const AuthContext = React.createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

import Splash from './src/screens/Splash';
import Login from './src/screens/Login';
import Resetpass1 from './src/screens/Resetpass1';
import Resetpass2 from './src/screens/Resetpass2';
import Newpass from './src/screens/Newpass';
import Updatedpass from './src/screens/Updatedpass';
import Createacc from './src/screens/Createacc';
import Editacc from './src/screens/Editacc';
import Changepass from './src/screens/Changepass';
import Dashboard from './src/screens/Dashboard';
import Search from './src/screens/Search';
import BottomTabNavigatoion from './src/navigations/BottomTabNavigation';
import Popularevents from './src/screens/Popularevents';
import Eventdetails from './src/screens/Eventdetails';
import Selecttickets from './src/screens/Selecttickets';
import Notifications from './src/screens/Notifications';
import Chats from './src/screens/Chats';
import Eventchat from './src/screens/Eventchat';
import Favourite from './src/screens/Favourite';
import Profile from './src/screens/Profile';
import Mytickets from './src/screens/Mytickets';
import Paymentdetails from './src/screens/Paymentdetails';
import Paymentverification from './src/screens/Paymentverification';
import axios from 'axios';

export default function App() {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await SecureStore.getItemAsync("accessToken");

        if (userToken === null) {
          dispatch({ type: "SIGN_OUT" });
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        const responce = await axios.get(
          `${API_URL}/getupcomingeventdata`
        );
        if (responce.status === 200) {
          dispatch({ type: "RESTORE_TOKEN", token: userToken });
        } else {
          dispatch({ type: "SIGN_OUT" });
        }
      } catch (e) {
        dispatch({ type: "SIGN_OUT" });
      }
      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        
        // console.log("App.js data..", data);

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const data = await AsyncStorage.getItem("accessToken");
        const responce1 = await AsyncStorage.getItem("username");

        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: async() => {
        await SecureStore.deleteItemAsync("accessToken"); // <-- Use deleteItemAsync instead of setItemAsync

        dispatch({ type: "SIGN_OUT" })},
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),
    []
  );
  return (
    <AuthContext.Provider value={authContext}>

      <AppNavigation userToken={state.userToken}/>
    </AuthContext.Provider>
      // <BottomTabNavigatoion />

    // <Splash />
    // <Login />
    // <Resetpass1 />
    // <Resetpass2 />
    // <Newpass />
    // <Updatedpass />

    // <Createacc/>
    // <Editacc />
    // <Changepass/>

    // <Search />
    // <Dashboard /> 
    // <Popularevents />
    // <Eventdetails />
    // <Selecttickets />
    // <Paymentdetails />
    
    // <Paymentverification />
    
    

    // <Notifications />
    // <Chats />
    // <Eventchat />
    // <Favourite />
    // <Profile />
    // <Mytickets />
    
     
  );
}