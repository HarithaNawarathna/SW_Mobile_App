import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';
import * as FileSystem from 'expo-file-system';
import axios, { Axios } from 'axios';

const API_URL = 'http://192.168.182.240:3000';

function Editprofilefield() {
    return (
        <View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Enter Full Name'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 30 }]}>
                <TextInput
                    placeholder='Enter Email Address'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 30 }]}>
                <TextInput
                    placeholder='Enter NIC'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                />
            </View>
            <View style={[styles.inputContainer, { marginTop: 30 }]}>
                <TextInput
                    placeholder='Enter Contact No'
                    placeholderTextColor={'#000000'}
                    style={styles.input}
                />
            </View>

            <Changepassbutton />
            <BottomButtons2 />
        </View>
    );
}

function Changepassbutton() {
    const navigation = useNavigation();

    function gotoChangepass() {
        navigation.navigate('Changepass');
    }

    return (
        <TouchableOpacity onPress={gotoChangepass}>
            <View>
                <Text style={styles.changePasswordText}>
                    Change Password
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function BottomButtons2() {
    const navigation = useNavigation();

    function gotoLogin() {
        navigation.navigate('Login');
    }

    function gotoProfile() {
        navigation.navigate('Profile');
    }

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={gotoProfile}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotoLogin}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>
                        Save
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Editacc = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem('username')
            .then((value) => setUsername(value)) // Set the username state
            .catch((error) => console.error('Error fetching username:', error));
    }, []);

    // useEffect(() => {

    //     Axios.put(`${API_URL}/upload-image`, { image })
    // }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadImage = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            await ref.put(blob);
            setUploading(false);
            Alert.alert('Success', 'Image uploaded successfully');
            setImage(null);
        } catch (error) {
            console.error('Error uploading image:', error);
            setUploading(false);
        }
    };

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Edit Profile
                </Text>
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.imageContainer}>
                        {image && <Image
                            source={{ uri: image }}
                            style={{ width: 300, height: 300 }}
                        />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={styles.labelText}>
                    {username}
                </Text>
                <Editprofilefield />
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#401971',
        alignItems: 'center',
        height: 887,
    },
    labelText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 30,
        marginTop: 20,
    },
    inputContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        height: 35,
        width: 350,
        marginHorizontal: 20,
        justifyContent: 'center',
        paddingLeft: 20,
        marginBottom: 5,
    },
    inputText: {
        fontSize: 18,
        opacity: 0.5,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginTop: 20,
    },
    button: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 150,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 4,
    },
    buttonText: {
        fontSize: 25,
        color: '#000000',
        textAlign: 'center',
    },
    changePasswordText: {
        fontSize: 18,
        color: '#C69CD1',
        marginHorizontal: 25,
        marginTop: 30,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 44,
        marginTop: 80,
    },
    uploadButton: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 150,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 4,
    },
    imageContainer: {
        alignItems: 'center',
        height: 80,
        width: 100,
        borderColor: '#FFFFFF',
        borderWidth: 2,
    },
});

export default Editacc;
