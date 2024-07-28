// Filename: index.js
// Combined code from all files

import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Animated, Easing, TouchableOpacity, Dimensions, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import the icon library

const { width } = Dimensions.get('window');

function App() {
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
        
        // Ensure the answer updates immediately
        setTimeout(() => {
            // Reset animation
            fadeAnim.setValue(0);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500, // 0.5 sec fade in
                easing: Easing.ease,
                useNativeDriver: true,
            }).start();
        }, 0); // Delay of 0 ensures the state update happens
    };

    const handleExit = () => {
        // Trigger the back handler to exit the app
        BackHandler.exitApp();
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
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
        width: width * 0.5, // Take 50% of the screen width
    },
    buttonContainer: {
        padding: 20,
        marginBottom: 20,
    },
    answer: {
        fontSize: 40, // Increase the font size for the answer
        color: '#FFFFFF', // White font color
        fontFamily: 'sans-serif',
        textAlign: 'center',
        width: '100%', // Ensure the answer text takes up the entire box width
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