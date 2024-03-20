import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

function CircleWithText1() {
    return (
        <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#F6BD0F',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 40,
        }}>
            <Text style={{
                fontSize: 45,
                fontWeight: 'bold',
                color: 'white',
            }}>12</Text>
        </View>
    );
};

function CircleWithText2() {
    return (
        <View style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            backgroundColor: '#F6BD0F',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 40,
        }}>
            <Text style={{
                fontSize: 45,
                fontWeight: 'bold',
                color: 'white',
            }}>10</Text>
        </View>
    );
};

function TicketsButton(propsticketsbutton) {

    const stack = propsticketsbutton.stack;

    function gotoMytickets() {
        stack.navigate('Mytickets')
    }

    return (
        <TouchableOpacity onPress={gotoMytickets}>
            <View>
            <Icon style={{
                marginTop: 40,
            }} name="ticket" size={40} color="#FFB300" />
            <Text style={{
                fontSize: 25,
                color: '#FFFFFF',
                marginHorizontal: 45,
                marginTop: -33,
            }}>
                Tickets
            </Text>
        </View>
        </TouchableOpacity>
    );
}

function EditProfileButton(propseditprofilebutton) {

    const stack2 = propseditprofilebutton.stack2;

    function gotoEditacc() {
        stack2.navigate('Editacc')
    }

    return (
        <TouchableOpacity onPress={gotoEditacc}>
            <View>
                <Icon style={{
                    marginTop: 80,
                }} name="pencil-sharp" size={30} color="#C7ADCE" />
                <Text style={{
                    fontSize: 20,
                    color: '#C7ADCE',
                    marginHorizontal: 30,
                    marginTop: -25,
                }}>
                    Edit Profile
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function LogoutButton(propslogoutbutton) {

    const stack3 = propslogoutbutton.stack3;

    function gotologin() {
        stack3.navigate('Login')
    }

    return (
        <TouchableOpacity onPress={gotologin}>
            <View >
                <Icon style={{
                    marginTop: 20,
                }} name="log-out-outline" size={40} color="#C7ADCE" />
                <Text style={{
                    fontSize: 25,
                    color: '#C7ADCE',
                    marginHorizontal: 30,
                    marginTop: -35,
                    marginLeft: 47,
                }}>
                    Logout
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const Profile = (propsprofile) => {

    const stack = propsprofile.stack;
    const stack2 = propsprofile.stack2;
    const stack3 = propsprofile.stack3;

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/img/userprofile.png')}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 100,
                    borderWidth: 4,
                    borderColor: '#F6BD0F',
                    marginBottom: 10,
                    marginTop: 100,
                }}
            />
            <Text style={{
                fontSize: 30,
                color: '#FFFFFF',
                marginBottom: 20,
                fontWeight: 'bold',
            }}>
                --Name--
            </Text>

            <View style={{
                flexDirection: 'row',
            }}>
                <CircleWithText1 />
                <CircleWithText2 />
            </View>

            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    marginBottom: 20,
                    marginHorizontal: 50,
                }}>
                    Attended
                </Text>
                <Text style={{
                    fontSize: 20,
                    color: '#FFFFFF',
                    marginBottom: 20,
                    marginHorizontal: 50,
                }}>
                    Upcoming
                </Text>
            </View>

            <TicketsButton stack={stack} />

            <EditProfileButton stack2={stack2} />

            <LogoutButton stack3={stack3} />
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})