import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    SafeAreaView,
    ScrollView,
    ImageBackground
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePuzzle from "./puzzles/ImagePuzzle";
import MathPuzzle from "./puzzles/MathPuzzle";
import LogicPuzzle from "./puzzles/LogicPuzzle";
import WordPuzzle from "./puzzles/WordPuzzle";


const PUZZLES_KEY = 'puzzleProgress';

const PuzzleChallengesScreen = () => {
    const [puzzles, setPuzzles] = useState([
        { id: 1, title: 'Picture Puzzle', type: 'image', solved: false },
        { id: 2, title: 'Math Puzzle', type: 'math', solved: false },
        { id: 3, title: 'Logic Puzzle', type: 'logic', solved: false },
        { id: 4, title: 'Word Puzzle', type: 'word', solved: false },
    ]);

    const [activePuzzle, setActivePuzzle] = useState(null);

    useEffect(() => {
        loadProgress();
    }, []);

    const loadProgress = async () => {
        try {
            const saved = await AsyncStorage.getItem(PUZZLES_KEY);
            if (saved) {
                setPuzzles(JSON.parse(saved));
            }
        } catch (e) {
            console.log('Ошибка загрузки прогресса:', e);
        }
    };

    const saveProgress = async (updated) => {
        setPuzzles(updated);
        await AsyncStorage.setItem(PUZZLES_KEY, JSON.stringify(updated));
    };

    const markAsSolved = (id) => {
        const updated = puzzles.map(p => p.id === id ? { ...p, solved: true } : p);
        saveProgress(updated);
        setActivePuzzle(null);
    };

    const renderPuzzleComponent = () => {
        if (!activePuzzle) return null;
        switch (activePuzzle.type) {
            case 'image':
                return <ImagePuzzle onSolved={() => markAsSolved(activePuzzle.id)} />;
            case 'math':
                return <MathPuzzle onSolved={() => markAsSolved(activePuzzle.id)} />;
            case 'logic':
                return <LogicPuzzle onSolved={() => markAsSolved(activePuzzle.id)} />;
            case 'word':
                return <WordPuzzle onSolved={() => markAsSolved(activePuzzle.id)} />;
            default:
                return null;
        }
    };

    return (
        // <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
                style={styles.background}
            >


            <Text style={styles.header}>Puzzle Challenges</Text>
            <ScrollView style={{paddingHorizontal: 10}}>
                {puzzles.map((puzzle) => (
                    <TouchableOpacity
                        key={puzzle.id}
                        style={styles.puzzleCard}
                        onPress={() => setActivePuzzle(puzzle)}
                    >
                        <Text style={styles.puzzleTitle}>{puzzle.title}</Text>
                        {puzzle.solved && (
                            <Image
                                source={require('../assets/img/1e642a09e829362d72cb205f8f4cda9d02de3f1b.png')}
                                style={styles.trophyIcon}
                            />
                        )}
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <Modal visible={!!activePuzzle} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {renderPuzzleComponent()}
                        <TouchableOpacity style={styles.closeButton} onPress={() => setActivePuzzle(null)}>
                            <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'Rowdies-Regular', }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            </ImageBackground>

        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#430000', padding: 20 },
    header: { color: '#FFD700', fontFamily: 'Rowdies-Regular',paddingTop: 80,fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
    puzzleCard: {
        backgroundColor: '#600000',
        padding: 15,
        borderRadius: 15,
        fontFamily: 'Rowdies-Regular',
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    background: { flex: 1, resizeMode: 'cover' },

    puzzleTitle: { color: '#fff',fontFamily: 'Rowdies-Regular', fontSize: 18, fontWeight: 'bold' },
    trophyIcon: { width: 30, height: 30, resizeMode: 'contain' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#430000', padding: 20, borderRadius: 20, width: '90%' },
    closeButton: { backgroundColor: '#FFD700', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, alignSelf: 'center', marginTop: 10 },
});

export default PuzzleChallengesScreen;
