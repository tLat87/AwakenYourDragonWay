import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const WelcomeScreen2 = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')} // Replace with your image path
            style={styles.background}
        >
            <View style={styles.container}>
                <Image
                    source={require('../assets/img/LOGO1.png')} // Replace with your image path
                    style={styles.flameImage}
                />
                <View style={styles.contentBox}>
                    <Text style={styles.heading}>Light the Fire{"\n"}Every Day</Text>
                    <Text style={styles.description}>
                        Log in daily to "fan" your flame and receive an inspiring quote from the Buddha. Every day without fail reinforces your thirst for action and discovers new styles of flame.
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('BottomTabsS')}}>
                        <Text style={styles.buttonText}>CONTINUE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 50,
    },
    flameImage: {
        width: 250, // Adjust size as needed
        height: 250, // Adjust size as needed
        resizeMode: 'contain',
        marginTop: 100,
    },
    contentBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        marginTop: 40,
        alignItems: 'center',
    },
    heading: {
        color: '#FFD700',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'Rowdies-Regular',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontFamily: 'Rowdies-Regular',
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginTop: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#8B4513',
        fontFamily: 'Rowdies-Regular',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen2;
