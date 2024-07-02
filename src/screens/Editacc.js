import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

const Editacc = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [nic, setNic] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id');
                if (user_id) {
                    setUserId(user_id);
                    const response = await axios.get(`${API_URL}/get-user/${user_id}`);
                    const userData = response.data[0];
                    setFullName(userData.name);
                    setEmail(userData.email);
                    setNic(userData.nic);
                    setContactNumber(userData.contact_number);
                    setProfileImage(userData.profile_image);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();

        AsyncStorage.getItem('username')
            .then((value) => setUsername(value))
            .catch((error) => console.error('Error fetching username:', error));
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateNic = (nic) => {
        const nicRegex = /^(\d{9}[vV]|\d{12})$/;
        return nicRegex.test(nic);
    };

    const validateContactNumber = (contactNumber) => {
        const contactNumberRegex = /^0\d{9}$/;
        return contactNumberRegex.test(contactNumber);
    };

    const validateFullName = (name) => {
        return name.length <= 12;
    };

    const saveChanges = async () => {
        if (!validateFullName(fullName)) {
            Alert.alert('Error', 'Name can contain a maximum of 12 characters');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Invalid email address');
            return;
        }
        if (!validateNic(nic)) {
            Alert.alert('Error', 'NIC must be either 12 digits or 9 digits followed by "v" or "V"');
            return;
        }
        if (!validateContactNumber(contactNumber)) {
            Alert.alert('Error', 'Contact number should contain 10 digits starting with 0');
            return;
        }

        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!user_id) {
                Alert.alert('Error', 'User ID not found');
                return;
            }
            const updatedData = {
                user_id: parseInt(user_id, 10),
                name: fullName,
                email: email,
                nic: nic,
                contact_number: contactNumber
            };
            await axios.put(`${API_URL}/edit-user`, updatedData);
            Alert.alert('Success', 'Profile updated successfully');
            AsyncStorage.setItem('username', fullName);
            navigation.navigate('Editacc'); // Navigate to the same screen
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'Failed to update profile');
        }
    };

    const goToChangePassword = () => {
        navigation.navigate('Changepass');
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <Image
                source={profileImage ? { uri: profileImage } : require('../../assets/img/userprofile.png')}
                style={styles.profileImage}
            />
            <Text style={styles.labelText}>{username}</Text>
            <Text style={styles.labelText1}>{email}</Text>
            <Text style={styles.labelText1}>{nic}</Text>

            <View style={styles.form}>
                <TextInput
                    placeholder='Enter Full Name'
                    placeholderTextColor={'#555555'}
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                />
                <TextInput
                    placeholder='Enter Contact No'
                    placeholderTextColor={'#555555'}
                    style={styles.input}
                    value={contactNumber}
                    onChangeText={setContactNumber}
                />
            </View>
            <TouchableOpacity onPress={goToChangePassword}>
                <Text style={styles.changePasswordText}>Change Password</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={saveChanges} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginTop: 40,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 30,
        marginBottom: 30,
        borderWidth: 4,
        borderColor: '#F6BD0F',
    },
    labelText: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 60,
        fontWeight: 'bold',
    },
    labelText1: {
        fontSize: 22,
        color: '#FFFFFF',
        marginBottom: 20,
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
    form: {
        width: '95%',
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 40,
        marginVertical: 10,
        paddingLeft: 15,
        fontSize: 18,
        color: '#000000',
    },
    changePasswordText: {
        fontSize: 20,
        color: '#C69CD1',
        marginTop: 10,
        marginBottom: 20,
        marginRight: 200,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#F6BD0F',
        height: 50,
        width: '48%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 20,
        color: '#401971',
        fontWeight: 'bold',
    },
});

export default Editacc;
