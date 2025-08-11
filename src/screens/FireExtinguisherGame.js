import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Image,
    SafeAreaView,
    Modal
} from 'react-native';

const FireExtinguisherGame = ({ navigation, route }) => {
    const { category } = route.params;

    const [taps, setTaps] = useState(0);
    const [gameState, setGameState] = useState('playing'); // playing, win, lose
    const [modalVisible, setModalVisible] = useState(false);
    const totalTapsNeeded = 15;
    const gameDuration = 5000;

    const flameSize = useRef(new Animated.Value(0.2)).current;
    const fadeOutOpacity = useRef(new Animated.Value(1)).current;

    const motivationalQuotes = {
        'Flame of Action': 'The journey of a thousand miles begins with a single step.',
        'Dragon Power': 'A warrior never gives up. Find the strength within.',
        'Buddha\'s Wisdom': 'What you think, you become. What you feel, you attract. What you imagine, you create.',
    };

    const supportiveQuote = 'Don\'t worry, you can try again tomorrow. The fire inside is not so easy to extinguish!';

    useEffect(() => {
        Animated.timing(flameSize, {
            toValue: 1,
            duration: gameDuration,
            useNativeDriver: false,
        }).start();

        const timer = setTimeout(() => {
            if (taps < totalTapsNeeded) {
                setGameState('lose');
            } else {
                setGameState('win');
                setModalVisible(true); // Показываем модальное окно при победе
            }
        }, gameDuration);

        return () => clearTimeout(timer);
    }, [taps]);

    const handleTap = () => {
        if (gameState === 'playing') {
            setTaps(taps + 1);

            const newSize = 1 - (taps / totalTapsNeeded);
            Animated.timing(flameSize, {
                toValue: newSize > 0 ? newSize : 0.1,
                duration: 50,
                useNativeDriver: false,
            }).start();

            if (taps + 1 >= totalTapsNeeded) {
                setGameState('win');
                setModalVisible(true);
                Animated.timing(fadeOutOpacity, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    const renderGameContent = () => {
        if (gameState === 'playing') {
            return (
                <View style={styles.gameContainer}>
                    <Text style={styles.gameTitle}>Tap to extinguish the fire!</Text>
                    <TouchableOpacity style={styles.touchArea} onPress={handleTap}>
                        <Animated.Image
                            source={require('../assets/img/icegif-1623.gif')}
                            style={[styles.flame, { transform: [{ scale: flameSize }] }]}
                        />
                    </TouchableOpacity>
                    <Text style={styles.tapCounter}>Taps: {taps}/{totalTapsNeeded}</Text>
                </View>
            );
        }

        if (gameState === 'lose') {
            return (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>The fire was too strong...</Text>
                    <Text style={styles.quoteText}>"{supportiveQuote}"</Text>
                    <TouchableOpacity
                        style={styles.resultButton}
                        onPress={() => navigation.pop(2)}
                    >
                        <Text style={styles.resultButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return null;
    };

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                {renderGameContent()}

                {/* Модальное окно при победе */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                        navigation.pop(2);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Image
                                source={require('../assets/img/1e642a09e829362d72cb205f8f4cda9d02de3f1b.png')}
                                style={styles.modalBuddhaImage}
                            />
                            <View style={styles.modalTextBox}>
                                <Image
                                    source={require('../assets/img/d90d50d2bf8241da7d8547110a8dfd9a1f45d0fb.png')}
                                    style={styles.modalIcon}
                                />
                                <Text style={styles.modalText}>
                                    The fire has gone out, write down 3 things you are grateful for today to reignite the fire in your soul
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    navigation.pop(2);
                                }}
                            >
                                <Text style={styles.modalButtonText}>Back</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: 'cover' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    gameContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    gameTitle: { color: '#fff',  fontFamily: 'Rowdies-Regular',fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    touchArea: { width: 300, height: 300, justifyContent: 'center', alignItems: 'center' },
    flame: { width: 250, height: 250, resizeMode: 'contain' },
    tapCounter: { color: '#FFD700',  fontFamily: 'Rowdies-Regular',fontSize: 18, marginTop: 20 },
    resultContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 },
    resultTitle: { color: '#FFD700', fontFamily: 'Rowdies-Regular', fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    quoteText: { color: '#fff',  fontFamily: 'Rowdies-Regular',fontSize: 18, fontStyle: 'italic', textAlign: 'center', marginBottom: 40 },
    resultButton: { backgroundColor: '#FFD700', borderRadius: 50, paddingVertical: 15, paddingHorizontal: 30 },
    resultButtonText: { color: '#8B4513',  fontFamily: 'Rowdies-Regular',fontSize: 18, fontWeight: 'bold' },

    // Модальное окно
    // --- Стили для модального окна ---
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Затемненный фон
    },
    modalContent: {
        backgroundColor: '#430000', // Темно-красный фон модального окна
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: '90%',
        fontFamily: 'Rowdies-Regular',
    },
    modalBuddhaImage: {
        width: 200, // Размер изображения Будды
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
        marginTop: -80, // Поднять изображение, чтобы оно выглядело, как на скриншоте
    },
    modalTextBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный фон для текста
        borderRadius: 15,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalIcon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    modalText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Rowdies-Regular',
        flex: 1,
        lineHeight: 22,
    },
    modalButton: {
        backgroundColor: '#FFD700',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 30,
        marginTop: 10,
    },
    modalButtonText: {
        color: '#8B4513',
        fontSize: 18,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
    },
});

export default FireExtinguisherGame;
