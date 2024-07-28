// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, Animated, Easing } from 'react-native';

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
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 2000, // 2 sec fade in
            easing: Easing.ease,
            useNativeDriver: true,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Button title="Get Answer" onPress={handlePress} color="#FFFFFF" />
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
        backgroundColor: '#00008B', // Dark blue background
        padding: 20,
        borderRadius: 15,
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: 20,
        alignItems: 'center',
    },
    answer: {
        marginTop: 20,
        fontSize: 24,
        color: '#FFFFFF', // White font color
        fontFamily: 'sans-serif',
    },
});