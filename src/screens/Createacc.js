import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Createprofilefield(propscreateprofilef) {

    const stack = propscreateprofilef.stack;
    const stack2 = propscreateprofilef.stack2;

    return (
        <View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,

            }}>
                <TextInput
                    placeholder='Enter First Name'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,
            }}>
                <TextInput
                    placeholder='Enter Last Name'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,

            }}>
                <TextInput
                    placeholder='Enter Email Address'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,
            }}>
                <TextInput
                    placeholder='Enter Contact No'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,

            }}>
                <TextInput
                    placeholder='Enter NIC'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,
            }}>
                <TextInput
                    placeholder='Enter New Password '
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 30,

            }}>
                <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>
            <BottomButtons stack={stack} stack2={stack2}/>
        </View>
    );
}

function BottomButtons(propsbottombuttons) {

    const stack = propsbottombuttons.stack;
    const stack2 = propsbottombuttons.stack;

    function gobacktologin(){
        stack2.navigate('Login')
    }

    function gotodashboard(){
        stack.navigate('Dashboard')
    }


    return (
        <View style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginTop: 40,
            marginBottom: 56,
        }}>
            <TouchableOpacity onPress={gobacktologin}>
            <View style={{
                backgroundColor: '#F6BD0F',
                height: 40,
                width: 150,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
                marginTop: 20,

            }}>
                <Text style={{
                    fontSize: 25,
                    color: '#000000',
                    textAlign: 'center'
                }}>
                    Cancel
                </Text>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={gotodashboard}>
            <View style={{
                backgroundColor:'#F6BD0F',
                height: 40,
                width: 150,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 20,
                marginTop: 20,

            }}>
                <Text style={{
                    fontSize: 25,
                    color: '#000000',
                    textAlign: 'center'
                }}>
                    Create
                </Text>
            </View>
            </TouchableOpacity>

        </View>
    );
}

const Createacc = (propscreateacc) => {

const stack = propscreateacc.navigation;
const stack2 = propscreateacc.navigation;

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>

                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginBottom: 20,
                    marginTop: 30,
                }}>
                    User Profile
                </Text>
                <Image
                    source={require('../../assets/img/userprofile.png')}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        borderWidth: 4,
                        borderColor: '#F6BD0F',
                        marginBottom: 30,
                    }}
                />
                <Createprofilefield stack={stack} stack2={stack2}/>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Createacc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})