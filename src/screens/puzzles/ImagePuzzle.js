import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const ImagePuzzle = ({ onSolved }) => {
    const initial = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
    const [pieces, setPieces] = useState(initial);
    const [selected, setSelected] = useState(null);

    const handleSelect = (index) => {
        if (selected === null) {
            setSelected(index);
        } else {
            const newPieces = [...pieces];
            [newPieces[selected], newPieces[index]] = [newPieces[index], newPieces[selected]];
            setPieces(newPieces);
            setSelected(null);

            if (newPieces.join('') === '0123') {
                Alert.alert('🎉 Done!', 'You completed the picture!', [{ text: 'OK', onPress: onSolved }]);
            }
        }
    };

    const positions = [
        { top: 0, left: 0 },
        { top: 0, left: -100 },
        { top: -100, left: 0 },
        { top: -100, left: -100 },
    ];

    return (
        <View style={styles.grid}>
            {pieces.map((p, i) => (
                <TouchableOpacity
                    key={i}
                    style={[styles.piece, selected === i && styles.selected]}
                    onPress={() => handleSelect(i)}
                >
                    <Image
                        source={require('../../assets/img/db6ce1944be859d2f271066c200b48d6ecbef24e.png')}
                        style={[
                            styles.image,
                            { transform: [{ translateX: positions[p].left }, { translateY: positions[p].top }] }
                        ]}
                    />
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    grid: { width: 200, height: 200, flexDirection: 'row', flexWrap: 'wrap' , marginLeft: 50},
    piece: { width: 100, height: 100, overflow: 'hidden', borderWidth: 1, borderColor: '#FFD700' },
    selected: { borderColor: '#fff', borderWidth: 3 },
    image: { width: 200, height: 200 },
});

export default ImagePuzzle;
