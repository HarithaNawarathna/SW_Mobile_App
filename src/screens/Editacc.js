import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

const Editacc = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [userId, setUserId]  = useState('');

    useEffect(() => {
        AsyncStorage.getItem('username')
            .then((value) => setUsername(value))
            .catch((error) => console.error('Error fetching username:', error));
    
        AsyncStorage.getItem('user_id')
            .then((value) => setUserId(value))
            .catch((error) => console.log('Error fetching user_id:', error));
    }, []);
    
    
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled && result.assets && result.assets.length > 0) {
            setImage(result.assets[0].uri);
            
        }
    };

    const uploadImage = async () => {
        setUploading(true);

        try {
            const user_id = await AsyncStorage.getItem('user_id');
            if (!image) {
                throw new Error('No image selected');
            }

            const response = await fetch(image);
            const blob = await response.blob();

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            const snapshot = await ref.put(blob);
            const downloadURL = await snapshot.ref.getDownloadURL();

            await axios.put(`${API_URL}/upload-image`, {
                user_id: user_id, 
                img_url: downloadURL,
            });

            setUploading(false);
            Alert.alert('Success', 'Image uploaded successfully');
            setImage(null);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            setUploading(false);
            Alert.alert('Error', error.message);
        }
    };

    const goToProfile = () => {
        navigation.navigate('Profile');
    };

    const goToLogin = () => {
        navigation.navigate('Profile');
    };

    const goToChangePassword = () => {
        navigation.navigate('Changepass');
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
                            style={{ width: 150, height: 150 }}
                        />}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Upload Image</Text>
                </TouchableOpacity>
                <Text style={styles.labelText}>
                    {username}
                </Text>
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
                </View>
                <TouchableOpacity onPress={goToChangePassword}>
                    <Text style={styles.changePasswordText}>
                        Change Password
                    </Text>
                </TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={goToProfile}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goToLogin}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}>
                                Save
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#401971',
        alignItems: 'center',
        height: 887,
        paddingVertical: 40,
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
    input: {
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
        marginTop: 20,
        marginRight: 200,
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        marginTop: 10,
    },
    uploadButton: {
        backgroundColor: '#F6BD0F',
        height: 35,
        width: 150,
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 20,
        marginBottom: 4,
    },
    imageContainer: {
        alignItems: 'center',
        height: 150,
        width: 150,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        marginBottom: 20,
    },
});

export default Editacc;
