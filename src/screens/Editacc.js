import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';

function Editprofilefield() {
    const navigation = useNavigation();

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

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>

                <Text style={styles.title}>
                    Edit Profile
                </Text>
                <Image
                    source={require('../../assets/img/userprofile.png')}
                    style={styles.profileImage}
                />
                <Text style={styles.labelText}>
                    --Name--
                </Text>
                <Editprofilefield />
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#401971',
        alignItems: 'center',
        height: 887,
    },
    labelText: {
        fontSize: 30,
        color: '#C7ADCE',
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
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#F6BD0F',
        marginBottom: 10,
    },
});

export default Editacc;
