import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

function Passwordfield() {
    const navigation = useNavigation();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const handlePasswordChange = (text) => {
        setNewPassword(text);
        validatePasswords(text, confirmPassword);
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        validatePasswords(newPassword, text);
    };

    const validatePasswords = (password, confirmPassword) => {
        if (password.length < 8 || !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
            setErrorMessage('Password must be at least 8 characters long and include both letters and numbers');
            setIsButtonDisabled(true);
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            setIsButtonDisabled(true);
            return;
        }

        setErrorMessage('');
        setIsButtonDisabled(false);
    };

    const handleCreatePassword = async () => {
        try {
            const email = await AsyncStorage.getItem('userEmail');
            const response = await axios.post(`${API_URL}/reset-password`, {
                email,
                newPassword,
            });
            Alert.alert('Success', 'Password updated successfully');
            await AsyncStorage.removeItem('userEmail');  // Remove email from AsyncStorage
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Failed to update password. Please try again later.');
        }
    };

    return (
        <View style={{ marginTop: 20 }}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter New Password'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                    secureTextEntry
                    value={newPassword}
                    onChangeText={handlePasswordChange}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 20 }]}>
                <TextInput
                    placeholder='Confirm New Password'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={handleConfirmPasswordChange}
                />
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
            <CreateButton onPress={handleCreatePassword} disabled={isButtonDisabled} />
        </View>
    );
}

function CreateButton({ onPress, disabled }) {
    return (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
            <View style={[styles.button, disabled && styles.buttonDisabled]}>
                <Text style={styles.buttonText}>
                    Create
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const Newpass = () => {
    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Reset Password
                </Text>
                <Image
                    source={require('../../assets/img/resetpass.png')}
                    style={styles.image}
                />
                <View>
                    <Text style={styles.subTitle}>
                        Create New Password
                    </Text>
                    <Text style={styles.description}>
                        Your new password must be different from the previous password
                    </Text>
                </View>
                <Passwordfield />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
        height: 887,
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginTop: 60,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    image: {
        width: 240,
        height: 250,
        alignSelf: 'center',
    },
    subTitle: {
        fontSize: 22,
        color: '#C7ADCE',
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        color: '#BBBBC4',
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        width: 320,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 40,
        width: 300,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingLeft: 20,
        marginTop: 20,
    },
    input: {
        fontSize: 18,
        opacity: 0.6,
    },
    button: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 250,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 116,
        alignSelf: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#C7ADCE',
    },
    buttonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
});

export default Newpass;
