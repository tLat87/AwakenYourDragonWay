import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const GratitudeListScreen = ({ navigation }) => {
    const [gratitudeEntries, setGratitudeEntries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchGratitudeEntries = async () => {
        try {
            const entries = await AsyncStorage.getItem('gratitudeEntries');
            if (entries) {
                const parsedEntries = JSON.parse(entries);
                // Sort entries by date (newest first)
                const sortedEntries = parsedEntries.sort((a, b) => new Date(b.date) - new Date(a.date));
                setGratitudeEntries(sortedEntries);
            }
        } catch (error) {
            console.error('Failed to fetch gratitude entries:', error);
            Alert.alert('Error', 'Failed to load your entries.');
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchGratitudeEntries();
        }, [])
    );

    const handleDelete = async (date) => {
        Alert.alert(
            'Delete entry?',
            'Are you sure you want to delete this gratitude entry?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: async () => {
                        try {
                            const updatedEntries = gratitudeEntries.filter(entry => entry.date !== date);
                            await AsyncStorage.setItem('gratitudeEntries', JSON.stringify(updatedEntries));
                            setGratitudeEntries(updatedEntries);
                            Alert.alert('Success', 'Entry deleted.');
                        } catch (error) {
                            console.error('Failed to delete entry:', error);
                            Alert.alert('Error', 'Failed to delete the entry.');
                        }
                    },
                    style: 'destructive',
                },
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>1 THING</Text>
                <Text style={styles.cardDate}>{item.date}</Text>
            </View>
            <View style={styles.gratitudeItem}>
                <Text style={styles.gratitudeText}>{item.gratitudes[0]}</Text>
            </View>

            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>2 THINGS</Text>
            </View>
            <View style={styles.gratitudeItem}>
                <Text style={styles.gratitudeText}>{item.gratitudes[1]}</Text>
            </View>

            <View style={styles.cardHeader}>
                <Text style={styles.cardLabel}>3 THINGS</Text>
            </View>
            <View style={styles.gratitudeItem}>
                <Text style={styles.gratitudeText}>{item.gratitudes[2]}</Text>
                <TouchableOpacity style={styles.cardIcon} onPress={() => handleDelete(item.date)}>
                    <Image
                        source={require('../assets/img/mingcute_delete-fill.png')}
                        style={styles.cardIconImage}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/img/442e8c309863b1e1e540b98edd7314e38f0bb392.png')}
            style={styles.background}
        >
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Things</Text>
                    <TouchableOpacity
                        style={styles.headerIconContainer}
                        onPress={() => navigation.navigate('GratitudeEntryScreen')}
                    >
                        <Image source={require('../assets/img/gridicons_add.png')} />
                    </TouchableOpacity>
                </View>

                {/* Conditional rendering: if no entries */}
                {gratitudeEntries.length === 0 && !isLoading ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Unfortunately, there is nothing yet.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={gratitudeEntries}
                        renderItem={renderItem}
                        keyExtractor={item => item.date}
                        contentContainerStyle={styles.listContent}
                    />
                )}
                <View style={{ marginBottom: 100 }} />
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    headerIconContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: '#fff',
        fontFamily: 'Rowdies-Regular',
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    card: {
        backgroundColor: '#430000',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardLabel: {
        color: '#FFD700',
        fontFamily: 'Rowdies-Regular',
        fontSize: 14,
        fontWeight: 'bold',
    },
    cardDate: {
        color: '#FFD700',
        fontSize: 12,
        fontFamily: 'Rowdies-Regular',
    },
    gratitudeItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#5C0000',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    gratitudeText: {
        color: '#fff',
        fontFamily: 'Rowdies-Regular',
        fontSize: 16,
        flex: 1,
    },
    cardIcon: {
        marginLeft: 10,
        padding: 5,
    },
    cardIconImage: {
        width: 20,
        height: 20,
        tintColor: '#FFD700',
    },
});

export default GratitudeListScreen;
