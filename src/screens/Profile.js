import { StyleSheet, Text, View, Image } from 'react-native'
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

const Profile = () => {
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

            <View>
            <Icon style={{
                marginTop: 90,
                }} name="log-out-outline" size={40} color="#C7ADCE" />
                <Text style={{
                    fontSize: 25,
                    color: '#C7ADCE',
                    marginHorizontal: 45,
                    marginTop: -35,
                }}>
                    Logout
                </Text>
            </View>
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