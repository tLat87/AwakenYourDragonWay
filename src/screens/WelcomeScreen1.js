import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const WelcomeScreen1 = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
            style={styles.background}
        >
            <View style={styles.container}>
                <Image
                    source={require('../assets/img/LOGO1.png')}
                    style={styles.logo}
                />
                <View style={styles.contentBox}>
                    <Text style={styles.heading}>Discover your{"\n"}Dragon Way</Text>
                    <Text style={styles.description}>
                        Welcome to Awaken Your Dragon Way - your personal source of daily motivation! Under the watchful eye of the Buddha, you will receive wise phrases that will ignite your inner flame
                    </Text>
                    {/*<TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate('WelcomeScreen2')}}>*/}
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
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
        justifyContent: 'flex-start', // Align content to the top
        alignItems: 'center',
        paddingTop: 50, // Adjust as needed
    },
    logo: {
        width: 250, // Adjust size as needed
        height: 250, // Adjust size as needed
        resizeMode: 'contain',
        marginTop: 50,
    },
    title: {
        color: '#FFD700',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -40,
        fontFamily: 'YourDragonFont-Bold', // Replace with your font
    },
    contentBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
        textAlign: 'center',
        fontFamily: 'Rowdies-Regular',
        marginBottom: 10,
    },
    description: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'Rowdies-Regular',
    },
    button: {
        backgroundColor: '#FFD700',
        borderRadius: 50,
        paddingVertical: 15,
        paddingHorizontal: 50,
        marginTop: 20,
        width: '80%', // Adjust width as needed
        alignItems: 'center',
    },
    buttonText: {
        color: '#8B4513',
        fontSize: 18,
        fontFamily: 'Rowdies-Regular',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen1;
