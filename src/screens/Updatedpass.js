import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'

function LoginButton(propsloginback) {

    const stack = propsloginback.stack;

    function gotoLogin(){
        stack.navigate('Login')
    }

    return (

        <TouchableOpacity onPress={gotoLogin}>
            <View style={{
                backgroundColor: '#F6BD0F',
                height: 40,
                width: 300,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 20,
                marginTop: 10,
                marginBottom: 20,

            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                    Login
                </Text>
            </View>
        </TouchableOpacity>

    );
}

const Updatedpass = (propsupdatedpass) => {

    const stack = propsupdatedpass.navigation;

    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: 22,
                color: '#FFFFFF',
                marginBottom: 20,
                fontWeight: 'bold',
            }}>
                Password Changed!
            </Text>

            <View>
                <Image
                    source={require('../../assets/img/updatedpass.png')}
                    style={{
                        width: 250,
                        height: 260,
                        alignContent: 'center',
                    }}
                />


            </View>
            <View>
                <Text style={{
                    fontSize: 16,
                    color: '#BBBBC4',
                    marginTop: 30,
                    marginBottom: 10,
                    textAlign: 'center',
                    marginHorizontal: 40,
                }}>
                    Your password has been updated successfully
                </Text>
            </View>
            <LoginButton stack={stack} />
        </View>
    )
}

export default Updatedpass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',

    },
})