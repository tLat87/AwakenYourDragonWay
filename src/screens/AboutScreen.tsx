import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    Animated
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const AboutScreen = ({ navigation }) => {
    // Анимации для текста
    const textOpacity = useRef(new Animated.Value(0)).current;
    const textTranslateY = useRef(new Animated.Value(50)).current;

    // Анимации для блока с планами
    const plansOpacity = useRef(new Animated.Value(0)).current;
    const plansTranslateY = useRef(new Animated.Value(50)).current;

    const startAnimations = () => {
        // Сброс анимаций, чтобы они могли запуститься снова
        textOpacity.setValue(0);
        textTranslateY.setValue(50);
        plansOpacity.setValue(0);
        plansTranslateY.setValue(50);

        // Анимация для текста
        Animated.parallel([
            Animated.timing(textOpacity, {
                toValue: 1,
                duration: 800,
                delay: 300,
                useNativeDriver: true,
            }),
            Animated.timing(textTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 300,
                useNativeDriver: true,
            }),
        ]).start();

        // Анимация для блока с планами
        Animated.parallel([
            Animated.timing(plansOpacity, {
                toValue: 1,
                duration: 800,
                delay: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(plansTranslateY, {
                toValue: 0,
                duration: 800,
                delay: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    useFocusEffect(
        React.useCallback(() => {
            startAnimations();
        }, [])
    );

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')} // Ваше фоновое изображение
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        {/*<TouchableOpacity onPress={() => navigation.goBack()}>*/}
                        {/*    <Image*/}
                        {/*        source={require('../assets/img/arrow_back_white.png')}*/}
                        {/*        style={styles.backIcon}*/}
                        {/*    />*/}
                        {/*</TouchableOpacity>*/}
                        <Text style={styles.headerTitle}>ABOUT APP</Text>
                        <View style={{ width: 24 }} /> {/* Заполнитель для выравнивания */}
                    </View>

                    {/* Buddha Image */}
                    <Image
                        source={require('../assets/img/7947eaf63de4498622a9de05a2cd4ce9d873dd8d.png')} // Изображение сидящего Будды
                        style={styles.buddhaImage}
                    />

                    {/* Описание приложения (анимированный) */}
                    <Animated.View style={[
                        styles.infoBox,
                        {
                            opacity: textOpacity,
                            transform: [{ translateY: textTranslateY }]
                        }
                    ]}>
                        <Text style={styles.infoText}>
                            Ignite your inner flame today.

                            Let the dragon of your determination lead you forward.

                            Light a spark of inspiration in each day.

                            Your fire is stronger than any doubt.

                            Buddha whispers: find peace in the fire of action.

                            Don’t be afraid to ignite – show your fire.

                            Step by step, ignite your passion.

                            Let your fire shine brighter.

                            Keep the flame of purpose at the center of your attention.

                            Today you can ignite new peaks.

                            The flame of your determination will not go out.

                            Fill your day with warm energy.

                            Be like a dragon – courageous and invincible.

                            With each breath, increase your inner fire.

                            Let the flame inspire your dream.

                            Reveal your power through the fire of action.

                            Today is the day your hearth burns.

                            Let the dragon of your soul awaken.

                            The fire in your heart is the best compass.

                            Feel the heat of a new beginning in every step.

                            Ignite faith in yourself and your path.

                            The wisdom of Buddha dispels the fog of doubt.

                            Let your path illuminate your own flame.

                            Ignite the inner fire of harmony.

                            Let the goal ignite your passion.

                            The fire of determination is the key to victory.

                            Your flame is your true strength.

                            Ignite every moment with your fire.

                            Every day is a new fiery start.

                            Keep the fire - carry it through life.                        </Text>
                    </Animated.View>

                    {/* Будущие планы (анимированный) */}
                    <Animated.View style={[
                        styles.plansBox,
                        {
                            opacity: plansOpacity,
                            transform: [{ translateY: plansTranslateY }]
                        }
                    ]}>
                        <Text style={styles.plansTitle}>FUTURE PLANS</Text>
                        <Text style={styles.plansItem}>✨ Personal progress tracking</Text>
                        <Text style={styles.plansItem}>✨ New motivational categories</Text>
                        <Text style={styles.plansItem}>✨ Social features: share your gratitude</Text>
                        <Text style={styles.plansItem}>✨ Achievements and rewards</Text>
                    </Animated.View>

                    <View style={{marginBottom: 100}}>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
    },
    buddhaImage: {
        width: '100%',
        height: 300, // Высота изображения Будды
        resizeMode: 'contain',
        marginBottom: 20,
    },
    infoBox: {
        backgroundColor: '#430000',
        borderRadius: 15,
        fontFamily: 'Rowdies-Regular',
        padding: 20,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    infoText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Rowdies-Regular',
        textAlign: 'center',
        lineHeight: 22,
    },
    plansBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
    },
    plansTitle: {
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Rowdies-Regular',
        marginBottom: 10,
        textAlign: 'center',
    },
    plansItem: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
        fontFamily: 'Rowdies-Regular',
        lineHeight: 22,
    },
});

export default AboutScreen;
