import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LogicPuzzle = ({ onSolved }) => {
    const handleAnswer = (ans) => {
        if (ans === '100') {
            Alert.alert('✅ Correct!', 'You solved the puzzle!', [{ text: 'OK', onPress: onSolved }]);
        } else {
            Alert.alert('❌ Incorrect', 'Try again');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.question}>
                Three cats caught three mice in three minutes. How many mice will 100 cats catch in 100 minutes?
            </Text>
            {['100', '300', '333'].map((opt) => (
                <TouchableOpacity key={opt} style={styles.button} onPress={() => handleAnswer(opt)}>
                    <Text style={styles.buttonText}>{opt}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center' },
    question: { color: '#FFD700', fontFamily: 'Rowdies-Regular',fontSize: 18, marginBottom: 20, textAlign: 'center' },
    button: { backgroundColor: '#FFD700', padding: 10, borderRadius: 10, marginVertical: 5, width: 120, alignItems: 'center' },
    buttonText: { color: '#430000', fontFamily: 'Rowdies-Regular',fontWeight: 'bold' },
});

export default LogicPuzzle;
