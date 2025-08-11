import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView, Image } from 'react-native';

const ActionFlameScreen = ({ navigation, route }) => {
    const { category } = route.params;

    const handleContinue = () => {
        // Переходим на экран с игрой
        navigation.navigate('FireExtinguisherGame', { category });
    };

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')} // Замените на ваше фоновое изображение
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={{color: '#fff',  fontFamily: 'Rowdies-Regular',}}>Back</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{category}</Text>
                </View>

                <View style={styles.content}>
                    <Image
                        source={require('../assets/img/icegif-1623.gif')} // Используйте GIF или анимацию Lottie для огня
                        style={styles.flameImage}
                    />
                    <Text style={styles.mottoText}>Start with the first{"\n"}step today</Text>

                    <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                        <Text style={styles.continueButtonText}>CONTINUE</Text>
                        <Image source={require('../assets/img/1e642a09e829362d72cb205f8f4cda9d02de3f1b.png')} style={styles.continueIcon} />
                    </TouchableOpacity>
                </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    backButton: {
        paddingRight: 10,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
        fontFamily: 'Rowdies-Regular',
    },
    headerTitle: {
        color: '#FFD700',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10,
        fontFamily: 'Rowdies-Regular',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flameImage: {
        width: 200, // Размеры GIF огня
        height: 200,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    mottoText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Rowdies-Regular',
        marginBottom: 40,
    },
    continueButton: {
        backgroundColor: '#FFD700',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Rowdies-Regular',
        width: '80%',
        borderRadius: 50,
        paddingVertical: 15,
    },
    continueButtonText: {
        fontFamily: 'Rowdies-Regular',
        color: '#8B4513',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    continueIcon: {
        width: 20,
        height: 20,
    },
});

export default ActionFlameScreen;
