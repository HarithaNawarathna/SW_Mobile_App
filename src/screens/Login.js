import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, {useState} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function Loginfield(propsloginf) {

    const stack = propsloginf.stack
    const stack1 = propsloginf.stack1
    const stack2 = propsloginf.stack2

    const [userName,setUserName] = useState('');
    const [userPassword,setUserPassword] = useState('');

    return (
        <View style={{ marginTop: 100 }}>

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
                    placeholder='Username'
                    placeholderTextColor={'#000000'}
                    onChangeText={(userName) => setUserName(userName)}
                    style={{
                        fontSize: 18, color: '#000000'
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
                    placeholder='Password'
                    placeholderTextColor={'#000000'}
                    secureTextEntry={true}
                    onChangeText={(userPassword) => setUserPassword(userPassword)}
                    style={{
                        fontSize: 18, color: '#000000'
                    }}
                />


            </View>
            <ForgetPassword stack={stack} />
            <LoginButton userName={userName} userPassword={userPassword} stack2={stack2} />
            <Noaccount stack1={stack1}/>

        </View>
    );
}

function ForgetPassword(propsforgot) {

    const stack = propsforgot.stack;

    function gotoResetpass1() {
        stack.navigate('Resetpass1')
    }

    return (
        <TouchableOpacity onPress={gotoResetpass1}>
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
                    Forget Password
                </Text>
            </View>
        </TouchableOpacity>
    );
}



function LoginButton(propsloginb) {

    const userName = propsloginb.userName;
    const userPassword = propsloginb.userPassword;

    const stack2 = propsloginb.stack2;

    const email = 'abc@gmail.com';
    const Password = '123';

    function gotodashboard() {
        if(userName==email && userPassword==Password){
            stack2.navigate('Dashboard')
        }else{
            Alert.alert('Invalid Username or Password');
        }
 
    }

    return (
        <View>
            <TouchableOpacity onPress={gotodashboard}>
            <View style={{
                backgroundColor: '#F6BD0F',
                height: 40,
                width: 300,
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
                    Login
                </Text>
            </View>
            </TouchableOpacity>
        </View>
    );
}

function Noaccount(propsnoacc) {

    
    const stack1 = propsnoacc.stack1;

    function createnewacc() {
        stack1.navigate('Createacc')
    }
    return (
        <View>
            <TouchableOpacity onPress={createnewacc}>
                <View style={{
                    height: 40,
                    width: 300,
                    justifyContent: 'center',
                    borderRadius: 20,
                    marginHorizontal: 20,
                    marginBottom: 112,

                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#C69CD1',
                        textAlign: 'center'
                    }}>
                        Don't have an account?
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const Login = (propslog) => {

    const stack = propslog.navigation;
    const stack1 = propslog.navigation;
    const stack2 = propslog.navigation;

    return (
        <KeyboardAwareScrollView keyboardShouldPersistTaps={'never'}>
            <View style={styles.container}>

                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginBottom: 100,
                    marginTop: 70,
                }}>
                    Welcome!
                </Text>

                <Text style={{
                    fontSize: 60,
                    color: '#F6BD0F',
                    marginRight: 1,
                    fontWeight: 'bold',
                    lineHeight: 59,


                }}>{'Epic\nEventify'}
                </Text>

                <Loginfield stack={stack} stack1={stack1} stack2={stack2}/>

                <StatusBar style="auto" />

            </View>
        </KeyboardAwareScrollView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
});