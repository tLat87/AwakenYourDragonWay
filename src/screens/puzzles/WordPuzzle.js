import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const WordPuzzle = ({ onSolved }) => {
    const handleAnswer = (word) => {
        if (word.toUpperCase() === 'SCHOOL') {
            Alert.alert('✅ Correct!', 'You guessed the word!', [{ text: 'OK', onPress: onSolved }]);
        } else {
            Alert.alert('❌ Incorrect', 'Try again');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>S _ H O O L</Text>
            {['SCHOOL', 'STHOOL', 'SCOHOL'].map((w) => (
                <TouchableOpacity key={w} style={styles.button} onPress={() => handleAnswer(w)}>
                    <Text style={styles.buttonText}>{w}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    question: { color: '#FFD700',fontFamily: 'Rowdies-Regular', fontSize: 24, marginBottom: 20 },
    button: { backgroundColor: '#FFD700', padding: 10, borderRadius: 10, marginVertical: 5, width: 140, alignItems: 'center' },
    buttonText: { color: '#430000', fontFamily: 'Rowdies-Regular',fontWeight: 'bold' },
});

export default WordPuzzle;
