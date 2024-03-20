import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

function CheckoutButton() {

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
                Checkout
            </Text>
        </View>
        </TouchableOpacity>

    );
}

const Selecttickets = () => {
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
                    Select Tickets
                </Text>
            </View>

            <View style={{
                marginTop: 40,
                marginLeft: 140,
            }}>
                <Text style={{
                    fontSize: 25,
                    color: '#FFFFFF',

                }}>
                    Event Name
                </Text>
                <Text style={{
                    fontSize: 20,
                    color: '#C7ADCE',
                    marginTop: 10,
                }}>
                    Event Date & Time
                </Text>
            </View>
            <View>
                <Text style={{
                    fontSize: 25,
                    color: '#FFFFFF',
                    marginTop: 50,
                    marginRight: 200,
                }}>
                    Ticket Type
                </Text>
            </View>

            <View>
                <Text style={{
                    fontSize: 25,
                    color: '#FFFFFF',
                    marginTop: 200,
                    marginRight: 150,
                }}>
                    Order Summary
                </Text>
            </View>
            <View style={{
                marginRight: 200,
            }}>
                <Text style={{
                    fontSize: 20,
                    color: '#C7ADCE',
                    marginTop: 10,
                }}>
                    Quantity
                </Text>
                <Text style={{
                    fontSize: 20,
                    color: '#C7ADCE',
                    marginTop: 10,
                }}>
                    Total
                </Text>
            </View>
            <CheckoutButton />
        </View>
    )
}

export default Selecttickets

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})