import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const MathPuzzle = ({ onSolved }) => {
    const correctAnswer = 11;

    const handleAnswer = (ans) => {
        if (ans === correctAnswer) {
            Alert.alert('✅ Correct!', 'You solved the equation!', [{ text: 'OK', onPress: onSolved }]);
        } else {
            Alert.alert('❌ Incorrect', 'Try again');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>5 + 3 × 2 = ?</Text>
            {[10, 11, 16].map((n) => (
                <TouchableOpacity key={n} style={styles.button} onPress={() => handleAnswer(n)}>
                    <Text style={styles.buttonText}>{n}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    question: { color: '#FFD700',fontFamily: 'Rowdies-Regular', fontSize: 20, marginBottom: 20 },
    button: { backgroundColor: '#FFD700', padding: 10, borderRadius: 10, marginVertical: 5, width: 100, alignItems: 'center' },
    buttonText: { color: '#430000', fontFamily: 'Rowdies-Regular',fontWeight: 'bold' },
});

export default MathPuzzle;
