import { StyleSheet, Text, View, TouchableOpacity  } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

function BuyTicketsButton() {

    return (
        <TouchableOpacity>
            <View style={{
            backgroundColor: '#F6BD0F',
            height: 40,
            width: 300,
            justifyContent: 'center',
            borderRadius: 20,
            marginTop: 50,

        }}>
            <Text style={{
                fontSize: 20,
                color: '#000000',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                Buy Tickets
            </Text>
        </View>
        </TouchableOpacity>

    );
}

const Eventdetails = () => {
    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 50,
                flexDirection: 'row',
            }}>
                <Icon style={{
                }} name="chevron-back-circle" size={40} color="#FFB300" />
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginHorizontal: 50,
                }}>
                    Event Details
                </Text>
                <Icon style={{
                    marginTop: 5,
                }} name="bookmarks" size={30} color="#FFB300" />
            </View>

            <View style={{
                marginTop: 240,
                marginRight: 140,
            }}>
                <Text style={{
                    fontSize: 28,
                    color: '#FFFFFF',

                }}>
                    Event Name
                </Text>
                <Text style={{
                    fontSize: 25,
                    color: '#C7ADCE',

                }}>
                    Event Location
                </Text>
            </View>

            <View style={{
                marginTop: 50,
                marginRight: 170,
            }}>
                <Text style={{
                    fontSize: 23,
                    color: '#FFFFFF',

                }}>
                    About
                </Text>
                <Text style={{
                    fontSize: 20,
                    color: '#C7ADCE',
                }}>
                    ---discription---
                </Text>
            </View>

            <View style={{
                marginTop: 30,
                marginRight: 170,

            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <Icon style={{
                    }} name="location-sharp" size={30} color="#FFB300" />
                    <Text style={{
                        fontSize: 23,
                        color: '#FFFFFF',
                        marginLeft: 10,
                    }}>Location</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                }}>
                    <Icon style={{   
                    }} name="calendar-clear" size={30} color="#FFB300" />
                    <Text style={{
                        fontSize: 20,
                        color: '#FFFFFF',
                        marginLeft: 10,
                        marginTop: -5,
                    }}>Date</Text>
                    
                </View>
                <Text style={{
                        fontSize: 20,
                        color: '#FFFFFF',
                        marginLeft: 40,
                        marginTop: -12,
                    }}>Time</Text>
            </View>
            <BuyTicketsButton />
        </View>
    )
}

export default Eventdetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})