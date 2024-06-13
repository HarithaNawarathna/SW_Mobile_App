import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

function Verificationcodefield() {
    const navigation = useNavigation();

    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputField}>
                <TextInput
                    placeholder='Enter Verification Code'
                    placeholderTextColor={'#000000'}
                    style={styles.textInput}
                />
            </View>
            <VerifyButton navigation={navigation} />
        </View>
    );
}

