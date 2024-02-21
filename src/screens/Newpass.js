import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Passwordfield(propspassf) {

    const stack = propspassf.stack;

    return (
        <View style={{ marginTop: 20 }}>


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
                    placeholder='Enter New Password'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.6,
                    }}
                />
            </View>

            <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 20,
                height: 40,
                width: 300,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginTop: 20,
            }}>
                <TextInput
                    placeholder='Confirm New Password'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.6,
                    }}
                />


            </View>
            <CreateButton stack={stack}/>
        </View>
    );
}

function CreateButton(propscreatebutton){

    const stack = propscreatebutton.stack;

    function gotoCreateButton(){
        stack.navigate('Updatedpass')
    }

    return (

            <TouchableOpacity onPress={gotoCreateButton}>
                <View style={{
                backgroundColor: '#F6BD0F',
                height: 40,
                width: 300,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 20,
                marginTop: 40,
                marginBottom: 116,

            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#000000',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>
                    Create
                </Text>
            </View>
            </TouchableOpacity>

    );
}

const Newpass = (propsnewpass) => {

    const stack = propsnewpass.navigation;

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
        <View style={styles.container}>
            <Text style={{
                fontSize: 22,
                color: '#FFFFFF',
                marginTop: 60,
                marginBottom: 5,
                fontWeight: 'bold',
            }}>
                Reset Password
            </Text>

            <View>
                <Image
                    source={require('../../assets/img/resetpass.png')}
                    style={{
                        width: 240,
                        height: 250,
                        alignContent: 'center',
                    }}
                />


            </View>
            
            <View>

                <Text style={{
                    fontSize: 22,
                    color: '#C7ADCE',
                    marginTop: 5,
                    marginBottom: 20,
                    textAlign: 'center',
                    marginHorizontal: 20,
                    fontWeight: 'bold',
                }}>
                    Create New Password
                </Text>

                <Text style={{
                    fontSize: 16,
                    color: '#BBBBC4',
                    marginTop: 5,
                    marginBottom: 20,
                    textAlign: 'center',
                    marginHorizontal: 20,
                }}>
                    Your New password must be different from previous password
                </Text>
            </View>

            
                <Passwordfield stack={stack} />
            

        </View>
        </KeyboardAwareScrollView>
    )
}

export default Newpass

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
        justifyContent: 'center',
    },
})