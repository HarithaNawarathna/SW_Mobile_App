import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigations/AppNavigation';
import 'react-native-gesture-handler';
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

export default function App() {
  return (
    <AppNavigation />

    // <Splash />
    // <Login />
    // <Resetpass1 />
    // <Resetpass2 />
    // <Newpass />
    // <Updatedpass />
    // <Createacc/>
    // <Editacc />
    // <Changepass/>
    // <Dashboard />
     
  );
}