import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

function Verificationcodefield({ otp, setOtp, setIsButtonDisabled }) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.inputField}>
                <TextInput
                    placeholder='Enter Verification Code'
                    placeholderTextColor={'#000000'}
                    style={styles.textInput}
                    value={otp}
                    onChangeText={(text) => {
                        setOtp(text);
                        setIsButtonDisabled(text.length !== 6);
                    }}
                    keyboardType='numeric'
                />
            </View>
        </View>
    );
}

function Verify({ otp, isButtonDisabled }) {
    const navigation = useNavigation();

    const handleVerify = async () => {
        try {
            const email = await AsyncStorage.getItem('email');
            const response = await axios.post(`${API_URL}/verify-otp`, { email: email, otp });

            if (response.status === 200) {
                navigation.navigate('Newpass');
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 404:
                        Alert.alert("Error", "OTP not found for this email.");
                        break;
                    case 408:
                        Alert.alert("Error", "OTP has expired.");
                        break;
                    case 400:
                        Alert.alert("Error", "Invalid OTP.");
                        break;
                    default:
                        Alert.alert("Error", "Error verifying OTP.");
                }
            } else {
                Alert.alert("Error", "Network error. Please try again.");
            }
        }
    };

    return (
        <TouchableOpacity onPress={handleVerify} disabled={isButtonDisabled}>
            <View style={[styles.verifyButton, isButtonDisabled && styles.verifyButtonDisabled]}>
                <Text style={[styles.verifyButtonText, isButtonDisabled && styles.verifyButtonTextDisabled]}>Verify</Text>
            </View>
        </TouchableOpacity>
    );
}

const Emailverification = () => {
    const [otp, setOtp] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Reset Password Verification
            </Text>

            <Image
                source={require('../../assets/img/forgotpass2.png')}
                style={styles.image}
            />

            <Text style={styles.description}>
                In order to verify your identity, enter the verification code that was sent to your mail
            </Text>

            <Verificationcodefield otp={otp} setOtp={setOtp} setIsButtonDisabled={setIsButtonDisabled} />
            <Verify otp={otp} isButtonDisabled={isButtonDisabled} />
        </View>
    );
}

export default Emailverification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 25,
        color: '#FFFFFF',
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 50,
    },
    image: {
        width: 240,
        height: 250,
        alignContent: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#BBBBC4',
        marginTop: 5,
        marginBottom: 20,
        textAlign: 'center',
        marginHorizontal: 10,
        width: 370,
    },
    inputContainer: {
        marginTop: 10,
    },
    inputField: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        height: 40,
        width: 300,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    textInput: {
        opacity: 0.6,
        fontSize: 18,
    },
    verifyButton: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 250,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 80,
        alignSelf: 'center',
    },
    verifyButtonDisabled: {
        backgroundColor: '#BEBEBE',
    },
    verifyButtonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    verifyButtonTextDisabled: {
        color: '#A9A9A9',
    },
});
