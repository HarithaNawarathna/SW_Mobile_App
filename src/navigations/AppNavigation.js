import { View, Text } from 'react-native'
import React from 'react'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Resetpass1 from '../screens/Resetpass1';
import Resetpass2 from '../screens/Resetpass2';
import Newpass from '../screens/Newpass';
import Updatedpass from '../screens/Updatedpass';
import Changepass from '../screens/Changepass';
import Editacc from '../screens/Editacc';
import Createacc from '../screens/Createacc';
import Dashboard from '../screens/Dashboard';


const Stack = createStackNavigator();

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={
                {
                    headerShown: false
                }
            }>
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Resetpass1" component={Resetpass1} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Resetpass2" component={Resetpass2} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Newpass" component={Newpass} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Updatedpass" component={Updatedpass} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Loginback" component={Login} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Createacc" component={Createacc} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Editacc" component={Editacc} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Changepass" component={Changepass} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
                <Stack.Screen name="Dashboard" component={Dashboard} options={
                    {
                        cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid
                    }
                }/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppNavigation