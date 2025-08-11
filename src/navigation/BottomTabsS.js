import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import GratitudeEntryScreen from "../screens/GratitudeEntryScreen";
import GratitudeListScreen from "../screens/GratitudeListScreen";
import MotivationalScreen from "../screens/MotivationalScreen";
import AboutScreen from "../screens/AboutScreen";



const Tab = createBottomTabNavigator();

const ICONS = {
    Home: require('../assets/img/bot/iconamoon_home-fill.png'),
    GratitudeListScreen:  require('../assets/img/bot/game-icons_sea-dragon.png'),
    MotivationalScreen: require('../assets/img/bot/streamline-ultimate_graph-stats-circle-bold.png'),

    AboutScreen: require('../assets/img/bot/tabler_file-info-filled.png'),

};

const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarLabel: '',
    tabBarIcon: () => (
        <Image
            source={ICONS[route.name] || ICONS.Home}
            resizeMode="contain"
        />
    ),
    tabBarStyle: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        elevation: 5,
        backgroundColor: '#260000',
        borderRadius: 40,
        borderWidth: 4,
        borderColor: '#8C0000',
        width: '90%',
        marginLeft: '5%',
        height: 100,
        paddingTop: 25,
        paddingBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
    },
    headerTitleStyle: {
        color: 'white',
        fontFamily: 'Quantico-BoldItalic',
        fontSize: 40,
    },
});

const BottomTabsS = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="GratitudeListScreen" component={GratitudeListScreen} />
            <Tab.Screen name="MotivationalScreen" component={MotivationalScreen} />

            <Tab.Screen name="AboutScreen" component={AboutScreen} />


        </Tab.Navigator>
    );
};

export default BottomTabsS;
