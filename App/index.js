// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Animated, Easing, TouchableOpacity, Dimensions, ActivityIndicator, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const App = () => {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const fadeAnim = new Animated.Value(0);

    const getRandomAnswer = () => {
        const rand = Math.random();
        if (rand < 0.4) return 'yep';
        if (rand < 0.6) return 'nope';
        return 'dunno';
    };

    const handlePress = () => {
        setLoading(true);
        setAnswer('');

        // Simulate a 5-second loading period
        setTimeout(() => {
            const newAnswer = getRandomAnswer();
            setAnswer(newAnswer);
            setLoading(false);

            // Reset animation
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 3000, // 3 sec fade in
                easing: Easing.ease,
                useNativeDriver: false,
            }).start();
        }, 5000); // 5 seconds delay
    };

    const handleExit = () => {
        BackHandler.exitApp();
    };

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={1}>
            <SafeAreaView style={styles.safeArea}>
                <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                    <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.box}>
                    {loading && <ActivityIndicator size="large" color="#FFFFFF" />}
                    {!loading && (
                        <Animated.Text
                            style={[
                                styles.answer,
                                {
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            {answer}
                        </Animated.Text>
                    )}
                </View>
            </SafeAreaView>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B',
    },
    safeArea: {
        flex: 1,
        width: '100%',
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.5,
    },
    answer: {
        fontSize: 40,
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
        textAlign: 'center',
        width: '100%',
    },
    exitButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: 'transparent',
    },
});

export default App;