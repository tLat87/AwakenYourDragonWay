// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

// Импортируем Redux store и Provider
import { Provider } from 'react-redux';
// import WelcomeScreen from "./src/screens/WellcomeScreen.tsx";
// import DashboardScreen from "./src/screens/DashboardScreen.tsx";
import {persistor, store} from "./src/redux/store";
import {PersistGate} from "redux-persist/integration/react";
import WelcomeScreen1 from "./src/screens/WelcomeScreen1";
import WelcomeScreen2 from "./src/screens/WelcomeScreen2";
import BottomTabsS from "./src/navigation/BottomTabsS";
import GratitudeEntryScreen from "./src/screens/GratitudeEntryScreen";
import FireExtinguisherGame from "./src/screens/FireExtinguisherGame";
import ActionFlameScreen from "./src/screens/ActionFlameScreen.tsx";



const Stack = createStackNavigator();

// Создадим компонент, который будет ждать загрузки персонажа из Redux
function AppContent() {

    // Определяем начальный маршрут на основе загруженного персонажа

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="WelcomeScreen1"
                component={WelcomeScreen1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="WelcomeScreen2"
                component={WelcomeScreen2}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="BottomTabsS"
                component={BottomTabsS}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="GratitudeEntryScreen"
                component={GratitudeEntryScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="ActionFlameScreen" component={ActionFlameScreen}   options={{ headerShown: false }} />
            <Stack.Screen name="FireExtinguisherGame" component={FireExtinguisherGame}   options={{ headerShown: false }}/>



            {/* Добавьте другие экраны здесь */}
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
                <AppContent />
            </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
    },
    loadingText: {
        marginTop: 10,
        color: '#FFD700',
        fontSize: 18,
    },
});
