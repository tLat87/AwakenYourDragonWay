import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, SafeAreaView, Animated, TouchableOpacity, Modal, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userStats';

const HomeScreen = () => {
    const [stats, setStats] = useState({
        currentStreak: 0,
        firstLoginDate: '',
        longestStreak: 0,
        fireGone: false,
    });

    const [showSplash, setShowSplash] = useState(true);
    const [showPuzzle, setShowPuzzle] = useState(false);
    const splashOpacity = useRef(new Animated.Value(1)).current;
    const contentOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        loadStats();

        const timer = setTimeout(() => {
            Animated.timing(splashOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start(() => setShowSplash(false));

            Animated.timing(contentOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const loadStats = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            if (jsonValue != null) {
                setStats(JSON.parse(jsonValue));
            } else {
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

    const saveStats = async (newStats) => {
        try {
            setStats(newStats);
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
        } catch (e) {
            console.log('Ошибка сохранения статистики:', e);
        }
    };

    const increaseStreak = async () => {
        const newStats = {
            ...stats,
            currentStreak: stats.currentStreak + 1,
            longestStreak: Math.max(stats.longestStreak, stats.currentStreak + 1),
        };
        await saveStats(newStats);
    };

    const SplashScreen = () => (
        <Animated.View style={[styles.splashContainer, { opacity: splashOpacity }]}>
            <Image
                source={require('../assets/img/1e642a09e829362d72cb205f8f4cda9d02de3f1b.png')}
                style={styles.splashImage}
            />
        </Animated.View>
    );

    const StatCard = ({ icon, label, value }) => (
        <View style={styles.statCard}>
            <Image source={icon} style={styles.statIcon} />
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
        </View>
    );

    // ------------------------ ПАЗЛ ------------------------
    const PuzzleModal = () => {
        const piecesInit = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        const [pieces, setPieces] = useState(piecesInit);
        const [selected, setSelected] = useState(null);

        const handleSelect = (index) => {
            if (selected === null) {
                setSelected(index);
            } else {
                const newPieces = [...pieces];
                [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
                setPieces(newPieces);
                setSelected(null);

                if (newPieces.join('') === '0123') {
                    Alert.alert('🎉 Congratulations!', 'You completed the puzzle!', [
                        {
                            text: 'OK',
                            onPress: () => {
                                increaseStreak();
                                setShowPuzzle(false);
                            },
                        },
                    ]);
                }
            }
        };

        const renderPiece = (pieceIndex, displayIndex) => {
            const pieceStyles = [
                styles.puzzlePiece,
                selected === displayIndex && styles.puzzlePieceSelected,
            ];
            const positions = [
                { top: 0, left: 0 },
                { top: 0, left: -100 },
                { top: -100, left: 0 },
                { top: -100, left: -100 },
            ];
            return (
                <TouchableOpacity
                    key={displayIndex}
                    style={pieceStyles}
                    onPress={() => handleSelect(displayIndex)}
                >
                    <Image
                        source={require('../assets/img/48c9531f53f5d12f3ca36dbb0c92e096784787a8.png')}
                        style={[styles.puzzleImage, { transform: [{ translateX: positions[pieceIndex].left }, { translateY: positions[pieceIndex].top }] }]}
                    />
                </TouchableOpacity>
            );
        };

        return (
            <Modal visible={showPuzzle} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Daily Puzzle</Text>
                        <View style={styles.puzzleGrid}>
                            {pieces.map((p, i) => renderPiece(p, i))}
                        </View>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setShowPuzzle(false)}>
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const MainContent = () => (
        <Animated.View style={[styles.mainContentContainer, { opacity: contentOpacity }]}>
            <ImageBackground
                source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
                style={styles.background}
            >
                <SafeAreaView style={styles.container}>
                    {/*<Image source={require('../assets/img/LOGO1.png')} style={styles.appLogo} />*/}
                    <Text style={styles.headerText}>STATISTICS</Text>

                    <View style={styles.statsGrid}>
                        <StatCard
                            icon={require('../assets/img/f5aa0e82fa0d47ba33f3498825ad40592452dcbf.png')}
                            label="Current Streak"
                            value={stats.currentStreak}
                        />
                        <StatCard
                            icon={require('../assets/img/16d713bae4e3f39426c1abaef3cc701e7ef9c053.png')}
                            label="First Login"
                            value={stats.firstLoginDate}
                        />
                        <StatCard
                            icon={require('../assets/img/db6ce1944be859d2f271066c200b48d6ecbef24e.png')}
                            label="Longest Streak"
                            value={`${stats.longestStreak} days`}
                        />
                    </View>

                    <TouchableOpacity style={styles.puzzleButton} onPress={() => setShowPuzzle(true)}>
                        <Text style={styles.puzzleButtonText}>Play Daily Puzzle</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
            <PuzzleModal />
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
    splashContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center', backgroundColor: '#430000', zIndex: 10 },
    splashImage: { width: 350, height: 350, resizeMode: 'contain' },
    mainContentContainer: { flex: 1 },
    background: { flex: 1, resizeMode: 'cover' },
    container: { flex: 1, alignItems: 'center', paddingTop: 20 },
    appLogo: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
    headerText: { color: '#FFD700', fontFamily: 'Rowdies-Regular',fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    statCard: { backgroundColor: '#430000', width: '42%', margin: 8, padding: 15, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 6, elevation: 5 },
    statIcon: { width: 60, height: 60, marginBottom: 10, resizeMode: 'contain' },
    statLabel: { color: '#FFD700', fontFamily: 'Rowdies-Regular',fontSize: 18, marginBottom: 5, textAlign: 'center' },
    statValue: { color: '#fff', fontSize: 20, fontFamily: 'Rowdies-Regular',fontWeight: 'bold' },
    puzzleButton: { marginTop: 20, backgroundColor: '#FFD700', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
    puzzleButtonText: { color: '#430000', fontSize: 16,fontFamily: 'Rowdies-Regular', fontWeight: 'bold' },

    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#430000', padding: 20, borderRadius: 20, width: '80%', alignItems: 'center' },
    modalTitle: { color: '#FFD700', fontSize: 22, fontFamily: 'Rowdies-Regular',fontWeight: 'bold', marginBottom: 10 },

    puzzleGrid: { width: 200, height: 200, flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
    puzzlePiece: { width: 100, height: 100, overflow: 'hidden', borderWidth: 1, borderColor: '#FFD700' },
    puzzlePieceSelected: { borderColor: '#fff', borderWidth: 3 },
    puzzleImage: { width: 200, height: 200 },

    closeButton: { backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
});

export default HomeScreen;
