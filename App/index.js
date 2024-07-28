// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Animated, Easing, TouchableOpacity } from 'react-native';

export default function App() {
    const [answer, setAnswer] = useState('');
    const fadeAnim = new Animated.Value(0);

    const getRandomAnswer = () => {
        const rand = Math.random();
        if (rand < 0.4) return 'yep';
        else if (rand < 0.6) return 'nope';
        else return 'dunno';
    };

    const handlePress = () => {
        const newAnswer = getRandomAnswer();
        setAnswer(newAnswer);

        // Reset animation
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000, // 1 sec fade in
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        });
    };

    const handleExit = () => {
        // Logic to exit the app
        // In a real device, you can use BackHandler.exitApp() from 'react-native'
        // For demonstration, we'll just log a message
        console.log("Exit button pressed");
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                <Text style={styles.exitButtonText}>Exit</Text>
            </TouchableOpacity>
            <View style={styles.box}>
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
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Get Answer" onPress={handlePress} color="#FFFFFF" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B', // Dark blue background
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%', // Take 50% of the screen width
    },
    buttonContainer: {
        padding: 20,
        marginBottom: 20,
    },
    answer: {
        fontSize: 24,
        color: '#FFFFFF', // White font color
        fontFamily: 'sans-serif',
        textAlign: 'center',
    },
    exitButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    exitButtonText: {
        color: '#00008B', // Dark blue text color
        fontSize: 16,
        fontWeight: 'bold',
    },
});