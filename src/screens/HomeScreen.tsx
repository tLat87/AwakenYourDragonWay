import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userStats';

const HomeScreen = ({ userStats: propUserStats, onFireGoneClick }) => {
    const [stats, setStats] = useState({
        currentStreak: 0,
        firstLoginDate: '',
        longestStreak: 0,
        fireGone: false,
    });

    const [showSplash, setShowSplash] = useState(true);
    const splashOpacity = useRef(new Animated.Value(1)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadStats();

        const timer = setTimeout(() => {
            Animated.timing(splashOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => {
                setShowSplash(false);
            });

            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Загрузка данных из AsyncStorage
    const loadStats = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                setStats(JSON.parse(jsonValue));
            } else {
                // Если данных нет — создаём дефолтные и сохраняем
                const defaultStats = {
                    currentStreak: 1,
                    firstLoginDate: new Date().toLocaleDateString(),
                    longestStreak: 1,
                    fireGone: false,
                };
                setStats(defaultStats);
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(defaultStats));
            }
        } catch (e) {
            console.log('Ошибка загрузки статистики:', e);
        }
    };

    // Сохранение данных в AsyncStorage
    const saveStats = async (newStats) => {
        try {
            setStats(newStats);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
        } catch (e) {
            console.log('Ошибка сохранения статистики:', e);
        }
    };

    const SplashScreen = () => (
        <Animated.View style={[styles.splashContainer, { opacity: splashOpacity }]}>
            <Image
                source={require('../assets/img/1e642a09e829362d72cb205f8f4cda9d02de3f1b.png')}
                style={styles.splashImage}
            />
        </Animated.View>
    );

    const MainContent = () => (
        <Animated.View style={[styles.mainContentContainer, { opacity: contentOpacity }]}>
            <ImageBackground
                source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
                style={styles.background}
            >
                <SafeAreaView style={styles.container}>
                    <View style={styles.header}>
                        <Image
                            source={require('../assets/img/LOGO1.png')}
                            style={styles.appLogo}
                        />
                        <Text style={styles.headerText}>STATISTICS</Text>
                    </View>

                    <View style={styles.statBox}>
                        <View style={styles.statIconContainer}>
                            <Image
                                source={require('../assets/img/f5aa0e82fa0d47ba33f3498825ad40592452dcbf.png')}
                                style={styles.statIcon}
                            />
                        </View>
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statLabel}>Your fire burns{"\n"}without a break</Text>
                            <Text style={styles.statValue}>{stats.currentStreak}</Text>
                        </View>
                    </View>

                    <View style={styles.statBox}>
                        <View style={styles.statIconContainer}>
                            <Image
                                source={require('../assets/img/16d713bae4e3f39426c1abaef3cc701e7ef9c053.png')}
                                style={styles.statIcon}
                            />
                        </View>
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statLabel}>You logged in{"\n"}from</Text>
                            <Text style={styles.statValue}>{stats.firstLoginDate}</Text>
                        </View>
                    </View>

                    <View style={styles.statBox}>
                        <View style={styles.statIconContainer}>
                            <Image
                                source={require('../assets/img/db6ce1944be859d2f271066c200b48d6ecbef24e.png')}
                                style={styles.statIcon}
                            />
                        </View>
                        <View style={styles.statTextContainer}>
                            <Text style={styles.statLabel}>Longest series</Text>
                            <Text style={styles.statValue}>{stats.longestStreak} DAYS</Text>
                        </View>
                    </View>

                    {stats.fireGone && (
                        <View style={styles.fireGoneBox}>
                            <Image
                                source={require('../assets/img/d90d50d2bf8241da7d8547110a8dfd9a1f45d0fb.png')}
                                style={styles.fireGoneIcon}
                            />
                            <Text style={styles.fireGoneText}>
                                The fire has gone out, write down 3 things you are grateful for today to reignite the fire in your soul
                            </Text>
                        </View>
                    )}
                </SafeAreaView>
            </ImageBackground>
        </Animated.View>
    );

    return (
        <View style={{ flex: 1 }}>
            {showSplash && <SplashScreen />}
            <MainContent />
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#430000',
        zIndex: 10,
    },
    splashImage: {
        width: 350,
        height: 350,
        resizeMode: 'contain',
    },
    mainContentContainer: {
        flex: 1,
    },
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
        paddingTop: 30
    },
    appLogo: {
        width: 120,
        height: 120,
        marginRight: 10,
        borderRadius: 8,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: 'Rowdies-Regular',
    },
    statBox: {
        backgroundColor: '#430000',
        flexDirection: 'row',
        fontFamily: 'Rowdies-Regular',
        alignItems: 'center',
        width: '90%',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    statIconContainer: {
        borderRadius: 30,
        padding: 5,
        marginRight: 15,
    },
    statIcon: {
        width: 100,
        height: 100,
        borderRadius: 10,
        resizeMode: 'contain',
    },
    statTextContainer: {
        flex: 1,
    },
    statLabel: {
        color: '#FFD700',
        fontFamily: 'Rowdies-Regular',
        fontSize: 26,
        marginBottom: 5,
    },
    statValue: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
    },
    fireGoneBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        width: '90%',
        borderRadius: 15,
        padding: 20,
        marginTop: 'auto',
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    fireGoneIcon: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        marginRight: 15,
    },
    fireGoneText: {
        color: '#fff',
        fontSize: 14,
        flex: 1,
        lineHeight: 20,
    },
});

export default HomeScreen;
