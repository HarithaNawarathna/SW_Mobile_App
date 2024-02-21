import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Emailfield(props_emailf) {

    const stack = props_emailf.stack
    
    return (
        <View style={{ marginTop: 10 }}>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                height: 40,
                width: 300,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
            }}>
                <TextInput
                    placeholder='Enter Your Email'
                    placeholderTextColor={'#000000'}
                    style={{
                        opacity: 0.6,
                        fontSize: 15,
                    }}
                />
            </View>
            <SendVerificationButton stack={stack} />
        </View>
    );
}

function SendVerificationButton(propsverification) {

    const stack = propsverification.stack;

    function gotoResetpass2(){
        stack.navigate('Resetpass2')
    }

    return (

        <TouchableOpacity onPress={gotoResetpass2}>
            <View style={{
            backgroundColor: '#F6BD0F',
            height: 40,
            width: 300,
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,
            marginTop: 40,
            marginBottom: 80,

        }}>
            <Text style={{
                fontSize: 20,
                color: '#000000',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                Send Verification Code
            </Text>
        </View>
        </TouchableOpacity>

    );
}

const Resetpass1 = (propsresetpass1) => {

    const stack = propsresetpass1.navigation;

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 22,
                color: '#FFFFFF',
                marginBottom: 5,
                fontWeight: 'bold',
            }}>
                Reset Password Verification
            </Text>

            <View>
                <Image
                    source={require('../../assets/img/forgotpass.png')}
                    style={{
                        width: 250,
                        height: 250,
                        alignContent: 'center',
                    }}
                />


            </View>
            <View>
                <Text style={{
                    fontSize: 16,
                    color: '#BBBBC4',
                    marginTop: 5,
                    marginBottom: 20,
                    textAlign: 'center',
                }}>
                    Enter your email starting with john******.com to continue
                </Text>
            </View>

            <Emailfield stack={stack} />

        </View>
    )
}

export default Resetpass1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
    },
})