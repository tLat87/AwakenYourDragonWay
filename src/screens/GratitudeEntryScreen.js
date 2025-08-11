import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Animated,
    KeyboardAvoidingView,
    Platform,
    Alert,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Make sure it's installed: npm install @react-native-async-storage/async-storage

const GratitudeEntryScreen = ({ navigation }) => {
    const [gratitude1, setGratitude1] = useState('');
    const [gratitude2, setGratitude2] = useState('');
    const [gratitude3, setGratitude3] = useState('');

    // Animation for SAVE button
    const saveButtonScale = useRef(new Animated.Value(1)).current;
    const saveButtonOpacity = useRef(new Animated.Value(1)).current;

    // Animation for save confirmation (checkmark)
    const checkmarkOpacity = useRef(new Animated.Value(0)).current;
    const checkmarkScale = useRef(new Animated.Value(0.5)).current;

    const handleSave = async () => {
        if (!gratitude1.trim() || !gratitude2.trim() || !gratitude3.trim()) {
            Alert.alert('Not all fields are filled', 'Please enter all three things you are grateful for.');
            return;
        }

        const newGratitudeEntry = {
            date: new Date().toISOString().split('T')[0], // Store only the date (YYYY-MM-DD)
            gratitudes: [gratitude1.trim(), gratitude2.trim(), gratitude3.trim()],
        };

        try {
            // Get all existing entries
            const existingEntries = await AsyncStorage.getItem('gratitudeEntries');
            let entries = existingEntries ? JSON.parse(existingEntries) : [];

            // Add new entry
            entries.push(newGratitudeEntry);

            // Save updated array
            await AsyncStorage.setItem('gratitudeEntries', JSON.stringify(entries));

            console.log('Data saved:', newGratitudeEntry);
            Alert.alert('Success', 'Your gratitudes have been saved!');

            // Run save animation
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(saveButtonScale, {
                        toValue: 0.8,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                    Animated.timing(saveButtonOpacity, {
                        toValue: 0,
                        duration: 150,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(checkmarkOpacity, {
                        toValue: 1,
                        duration: 300,
                        useNativeDriver: true,
                    }),
                    Animated.spring(checkmarkScale, {
                        toValue: 1.2,
                        friction: 3,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.timing(checkmarkOpacity, {
                    toValue: 0,
                    delay: 1000, // Show checkmark for 1 second
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                // After animation, reset fields and animation state
                setGratitude1('');
                setGratitude2('');
                setGratitude3('');
                saveButtonScale.setValue(1);
                saveButtonOpacity.setValue(1);
                checkmarkScale.setValue(0.5); // Reset for next use
                // Optionally navigate back, e.g. to HomeScreen
                // navigation.goBack();
            });

        } catch (error) {
            console.error('Error saving data:', error);
            Alert.alert('Error', 'Failed to save your gratitudes.');
        }
    };

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')} // Your background image
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardAvoidingView}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Three things I am{"\n"}grateful for today:</Text>
                    </View>

                    {/* Gratitude Inputs */}
                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>1 THING</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="LOREM IPSUM"
                                placeholderTextColor="#888"
                                value={gratitude1}
                                onChangeText={setGratitude1}
                                multiline
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>2 THINGS</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="LOREM IPSUM"
                                placeholderTextColor="#888"
                                value={gratitude2}
                                onChangeText={setGratitude2}
                                multiline
                            />
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.inputLabel}>3 THINGS</Text>
                        <View style={styles.inputRow}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="write here"
                                placeholderTextColor="#888"
                                value={gratitude3}
                                onChangeText={setGratitude3}
                                multiline
                            />
                        </View>
                    </View>

                    {/* Save Button */}
                    <View style={styles.saveButtonWrapper}>
                        <Animated.View style={[
                            styles.saveButtonAnimatedView,
                            {
                                opacity: saveButtonOpacity,
                                transform: [{ scale: saveButtonScale }]
                            }
                        ]}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>SAVE!</Text>
                            </TouchableOpacity>
                        </Animated.View>

                        {/* Animated checkmark confirmation */}
                        <Animated.View style={[
                            styles.checkmarkContainer,
                            {
                                opacity: checkmarkOpacity,
                                transform: [{ scale: checkmarkScale }]
                            }
                        ]}>
                            <Image
                                source={require('../assets/img/16d713bae4e3f39426c1abaef3cc701e7ef9c053.png')} // Checkmark icon
                                style={styles.checkmarkIcon}
                            />
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
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
        paddingTop: 20,
    },
    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'space-between', // Keeps SAVE button at the bottom
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    backIcon: {
        width: 24,
        height: 24,
        tintColor: '#fff', // White arrow
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Rowdies-Regular',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1, // Takes up available space
    },
    headerIconContainer: {
        width: 30, // Size of container for right-side icon
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
    inputContainer: {
        width: '90%',
        alignSelf: 'center',
        marginBottom: 20,
    },
    inputLabel: {
        color: '#FFD700', // Golden color
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        fontFamily: 'Rowdies-Regular',
    },
    inputRow: {
        flexDirection: 'row',
        backgroundColor: '#430000', // Dark red background for inputs
        borderRadius: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        color: '#fff', // White input text
        fontFamily: 'Rowdies-Regular',
        fontSize: 16,
        paddingVertical: 20,
        minHeight: 40, // Minimum height for multiline input
    },
    inputIcon: {
        marginLeft: 10,
        padding: 5,
    },
    iconSmall: {
        width: 20,
        height: 20,
        fontFamily: 'Rowdies-Regular',
        tintColor: '#FFD700', // Orange icon
    },
    saveButtonWrapper: {
        marginTop: 'auto', // Pushes button to the bottom
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 60, // Height for centering animated elements
    },
    saveButtonAnimatedView: {
        position: 'absolute', // So the checkmark can appear over it
        width: '80%',
    },
    saveButton: {
        backgroundColor: '#FFD700', // Golden button color
        borderRadius: 50,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50, // Button height
    },
    saveButtonText: {
        color: '#8B4513', // Brown text
        fontFamily: 'Rowdies-Regular',
        fontSize: 20,
        fontWeight: 'bold',
    },
    checkmarkContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkIcon: {
        width: 60, // Checkmark size
        height: 60,
        borderRadius: 20,
        resizeMode: 'contain',
    },
});

export default GratitudeEntryScreen;
