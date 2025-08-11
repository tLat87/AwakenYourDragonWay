import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';

const MotivationalScreen = ({ navigation }) => {
    const handleCategoryPress = (category) => {
        // Переход на следующий экран с передачей выбранной категории
        navigation.navigate('ActionFlameScreen', { category });
    };

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')} // Замените на ваше фоновое изображение
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>MOTIVATIONAL MOMENT</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.promptText}>CHOOSE 1 CATEGORY</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleCategoryPress('Flame of Action')}
                    >
                        <Text style={styles.buttonText}>Flame of Action</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleCategoryPress('Dragon Power')}
                    >
                        <Text style={styles.buttonText}>Dragon Power</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleCategoryPress('Buddha\'s Wisdom')}
                    >
                        <Text style={styles.buttonText}>Buddha's Wisdom</Text>
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
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerText: {
        color: '#fff',
        fontSize: 24,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    promptText: {
        color: '#FFD700',
        fontSize: 18,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FFD700',
        width: '90%',
        fontFamily: 'Rowdies-Regular',
        borderRadius: 50,
        paddingVertical: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#8B4513',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Rowdies-Regular',
    },
});

export default MotivationalScreen;
