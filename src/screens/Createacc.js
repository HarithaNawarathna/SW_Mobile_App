import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://192.168.182.240:3000';

function Createprofilefield({ formData, handleChange }) {
    return (
        <View>
            {["name", "email", "nic", "contact_number", "password", "confirmPassword"].map((placeholder, index) => (
                <View key={index} style={[styles.inputContainer, { marginTop: index === 0 ? 0 : 32 }]}>
                    <TextInput
                        placeholder={
                            placeholder === "confirmPassword"
                                ? "CONFIRM PASSWORD"
                                : `Enter ${placeholder.split('_').join(' ').toUpperCase()}`
                        }
                        placeholderTextColor={'#000000'}
                        style={styles.input}
                        secureTextEntry={placeholder.toLowerCase().includes("password")}
                        value={formData[placeholder]}
                        onChangeText={text => handleChange(placeholder, text)}
                    />
                </View>
            ))}
        </View>
    );
}

function BottomButtons({ formData, handleChange }) {
    const navigation = useNavigation();

    const handleCreate = async () => {
        // Validation
        if (!formData.name || !formData.email || !formData.nic || !formData.contact_number || !formData.password || !formData.confirmPassword) {
            Alert.alert("Error", "All fields are required");
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            Alert.alert("Error", "Invalid email format");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/signup`, {
                name: formData.name,
                email: formData.email,
                nic: formData.nic,
                contact_number: formData.contact_number,
                password: formData.password
            });

            if (response.status === 201) {
                await AsyncStorage.setItem('accessToken', response.data.accessToken);
                await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
                await AsyncStorage.setItem('username', response.data.username);
                Alert.alert("Success", "Account created successfully", [
                    { text: "OK", onPress: () => navigation.navigate('Emailverification') }
                ]);
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                Alert.alert("Error", "User already exists");
            } else {
                console.error(error);
                Alert.alert("Error", "Failed to create account");
            }
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCreate}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Create</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Createacc = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        nic: '',
        contact_number: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>User Profile</Text>
                <Image
                    source={require('../../assets/img/userprofile.png')}
                    style={styles.profileImage}
                />
                <Createprofilefield formData={formData} handleChange={handleChange} />
                <BottomButtons formData={formData} handleChange={handleChange} />
            </View>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#401971',
        alignItems: 'center',
        height: 887,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 20,
        marginTop: 80,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#F6BD0F',
        marginBottom: 30,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 37, // Increased height by 2px
        width: 350,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    input: {
        fontSize: 18,
        opacity: 0.5
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 40,
        marginBottom: 56,
    },
    button: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 150,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 25,
        color: '#000000',
        textAlign: 'center'
    }
});

export default Createacc;
