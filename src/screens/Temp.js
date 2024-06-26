import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { EmailProvider } from "./src/EmailContext";
import StackNavigation from "./src/navigation/StackNavigation";
import * as SQLite from "expo-sqlite";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import SignOut from "./src/screens/SignOut";
import Document from "./src/screens/Home/documents/Documents";
export const AuthContext = React.createContext();

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
        userToken = await SecureStore.getItemAsync("userToken");

        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        const responce = await axios.get(
          "http://192.168.229.140:33000/api/hello"
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

    const databaseHandling = async () => {
      const db = await SQLite.openDatabaseAsync("HealthHive");
      try {
        await db.execAsync(
          `CREATE TABLE IF NOT EXISTS fileStorage (
        id INTEGER PRIMARY KEY NOT NULL,
        userEmail TEXT NOT NULL,
        fileName TEXT NOT NULL,
        folderName TEXT NOT NULL,
        description TEXT NOT NULL,
        hash TEXT NOT NULL,
        date DATE DEFAULT CURRENT_TIMESTAMP
      );
      CREATE TABLE IF NOT EXISTS folderData (
      id INTEGER PRIMARY KEY NOT NULL,
      folderName TEXT NOT NULL);
      `
        );
      } catch (e) {
        console.log(e);
      }

      db.closeAsync();
    };

    bootstrapAsync();
    databaseHandling();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data, email) => {
        const token = data;
        const userEmail = email;
        // console.log("App.js data..", data);

        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token
        const responce = await SecureStore.setItemAsync("userToken", token);
        const responce1 = await SecureStore.setItemAsync(
          "userEmail",
          userEmail
        );

        dispatch({ type: "SIGN_IN", token: data });
      },
      signOut: () => dispatch({ type: "SIGN_OUT" }),
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
      <EmailProvider>
        <NavigationContainer>
          <StackNavigation userToken={state.userToken} />
        </NavigationContainer>
      </EmailProvider>
    </AuthContext.Provider>
  );
}


import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import Reset from "../screens/Reset";
import OTPScreen from "../screens/OTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import LoadingScreen from "../screens/LoadingScreen";
import DrawerNavigator from "./DrawerNavigator";
import Dashboard from "../screens/Home/Dashboard";
import UserProfile from "../screens/Home/UserProfile";
import DocumentViewer from "../screens/Home/DocumentViewer";
import Documents from "../screens/Home/documents/Documents";
import File from "../screens/Home/documents/File";
import LabFolder from "../screens/Home/documents/LabFolder";

const Stack = createNativeStackNavigator();

function StackNavigation({ userToken }) {
  return (
    console.log("Stack navigation userToken : ", userToken),
    (
      <Stack.Navigator initialRouteName="Splash">
        {userToken == null ? (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reset"
              component={Reset}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPScreen"
              component={OTPScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: "Your Profile" }}
            />

            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DocumentViewer"
              component={DocumentViewer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="File"
              component={File}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LabFolder"
              component={LabFolder}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    )
  );
}

export default StackNavigation;


import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/Splash";
import SignIn from "../screens/SignIn";
import Reset from "../screens/Reset";
import OTPScreen from "../screens/OTPScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import LoadingScreen from "../screens/LoadingScreen";
import DrawerNavigator from "./DrawerNavigator";
import Dashboard from "../screens/Home/Dashboard";
import UserProfile from "../screens/Home/UserProfile";
import DocumentViewer from "../screens/Home/DocumentViewer";
import Documents from "../screens/Home/documents/Documents";
import File from "../screens/Home/documents/File";
import LabFolder from "../screens/Home/documents/LabFolder";

const Stack = createNativeStackNavigator();

function StackNavigation({ userToken }) {
  return (
    console.log("Stack navigation userToken : ", userToken),
    (
      <Stack.Navigator initialRouteName="Splash">
        {userToken == null ? (
          <>
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Reset"
              component={Reset}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPScreen"
              component={OTPScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ResetPasswordScreen"
              component={ResetPasswordScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="DrawerNavigator"
              component={DrawerNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserProfile"
              component={UserProfile}
              options={{ title: "Your Profile" }}
            />

            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="DocumentViewer"
              component={DocumentViewer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Documents"
              component={Documents}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="File"
              component={File}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LabFolder"
              component={LabFolder}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    )
  );
}

export default StackNavigation;