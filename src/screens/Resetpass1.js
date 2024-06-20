import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

const Resetpass1 = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    const handleSendVerification = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email.');
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/reset-password-verification`, { email });
            Alert.alert('Success', response.data);
            await AsyncStorage.setItem('userEmail', email);  // Save email to AsyncStorage
            navigation.navigate('Resetpass2'); // Navigate to the next screen after sending email
        } catch (error) {
            console.error('Error sending verification email:', error);
            if (error.response) {
                // Server responded with a non-2xx status code
                Alert.alert('Error', `Server responded with status ${error.response.status}`);
            } else if (error.request) {
                // Request was made but no response was received
                Alert.alert('Error', 'No response received from server.');
            } else {
                // Something else happened in making the request
                Alert.alert('Error', 'Failed to send verification email. Please try again later.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Reset Password Verification
            </Text>
            <Image
                source={require('../../assets/img/forgotpass.png')}
                style={styles.image}
            />
            <Text style={styles.description}>
                Enter your email starting with john******.com to continue
            </Text>
            <View style={{ marginTop: 10 }}>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Enter Your Email'
                        placeholderTextColor={'#000000'}
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                    />
                </View>
                <TouchableOpacity onPress={handleSendVerification}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            Send Verification Code
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 5,
        fontWeight: 'bold',
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    description: {
        fontSize: 16,
        color: '#BBBBC4',
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 40,
        width: 300,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    input: {
        opacity: 0.6,
        fontSize: 18,
    },
    button: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 300,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginVertical: 50,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Resetpass1;
