import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Editprofilefield (propseditprofilefield) {

    const stack = propseditprofilefield.stack;

    return (
        <View>
             <View>
                <Text style={{
                    fontSize: 18,
                    color: '#C7ADCE',
                    marginBottom: 5,
                    marginLeft: 30,
                    marginTop: 10,
                }}>
                    First Name
                </Text>
             </View>
             <View style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                height: 35,
                width: 350,
                marginHorizontal: 20,
                justifyContent: 'center',
                paddingLeft: 20,
                marginBottom: 5,

            }}>
                <TextInput
                    placeholder='XXXXXXXXXX'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#C7ADCE',
                    marginBottom: 5,
                    marginHorizontal: 30,
                    marginTop: 15,
                }}>
                    Last Name
                </Text>
             </View>

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
                    placeholder='XXXXXXXXXX'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#C7ADCE',
                    marginBottom: 5,
                    marginHorizontal: 30,
                    marginTop: 15,
                }}>
                    Email Address
                </Text>
             </View>

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
                    placeholder='XXXXXXXXXX@gmail.com'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>
            
            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#C7ADCE',
                    marginBottom: 5,
                    marginHorizontal: 30,
                    marginTop: 15,
                }}>
                    Contact Number
                </Text>
             </View>
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
                    placeholder='0XXXXXXXXX'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>

            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#C7ADCE',
                    marginBottom: 5,
                    marginHorizontal: 30,
                    marginTop: 15,
                }}>
                    NIC
                </Text>
             </View>

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
                    placeholder='XXXXXXXXXX'
                    placeholderTextColor={'#000000'}
                    style={{
                        fontSize: 18,
                        opacity: 0.5
                    }}
                />
            </View>
            <Changepassbutton stack={stack}/>
            <BottomButtons2/>
        </View>
    );
}

function Changepassbutton(propschangepass) {

    const stack = propschangepass.stack;

    function gotoChangepass() {
        stack.navigate('Changepass')
    }

    return (
        <TouchableOpacity onPress={gotoChangepass}>
        <View style={{
            height: 40,
            width: 300,
            justifyContent: 'center',
            borderRadius: 20,
            marginHorizontal: 20,



        }}>
            <Text style={{
                fontSize: 18,
                color: '#C69CD1',
                paddingLeft: 15,

            }}>
                Change Password
            </Text>
        </View>
        </TouchableOpacity>
    );
}

function BottomButtons2() {
    return (
        <View style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginBottom: 56,
        }}>
            <View style={{
                backgroundColor: '#F6BD0F',
                height: 40,
                width: 150,
                justifyContent: 'center',
                borderRadius: 20,
                marginHorizontal: 10,
                marginTop: 20,
                marginBottom: 4,

            }}>
                <Text style={{
                    fontSize: 25,
                    color: '#000000',
                    textAlign: 'center'
                }}>
                    Cancel
                </Text>
            </View>

            <View style={{
                backgroundColor: '#F6BD0F',
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

        </View>
    );
}

const Editacc = (propseditacc) => {

    const stack = propseditacc.navigation;

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
                        marginBottom: 10,
                    }}
                />
                <Text style={{
                    fontSize: 25,
                    color: '#C7ADCE',
                    marginBottom: 10,
                }}>
                    --Name--
                </Text>
                <Editprofilefield stack={stack}/>
            </View>
            </KeyboardAwareScrollView>
  )
}

export default Editacc

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})