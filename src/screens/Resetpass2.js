import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Verificationcodefield(props_v_codef) {

    const stack = props_v_codef.stack

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
                    placeholder='Enter Verification Code'
                    placeholderTextColor={'#000000'}
                    style={{
                        opacity: 0.6,
                        fontSize: 18,
                    }}
                />
            </View>
            <VerifyButton stack={stack}/>
        </View>
    );
}

function VerifyButton(propsverify) {

    const stack = propsverify.stack;

    function gotoVerify(){
        stack.navigate('Newpass')
    }

    return (

            <TouchableOpacity onPress={gotoVerify}>
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
                    Verify
                </Text>
            </View>
            </TouchableOpacity>

    );
}

const Resetpass2 = (propsresetpass2) => {

    const stack = propsresetpass2.navigation;

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
                    source={require('../../assets/img/forgotpass2.png')}
                    style={{
                        width: 240,
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
                    In order to  verify your identity, enter the verification code that was sent to your mail
                </Text>
            </View>

            <Verificationcodefield stack={stack} />

        </View>
    )
}

export default Resetpass2

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
    },
})