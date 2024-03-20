import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

function BuyTicketsButton(propsbuyticketsbutton) {

    const stack = propsbuyticketsbutton.stack;

    function gotoselecttickets() {
        stack.navigate('Selecttickets')
    }

    return (
        <TouchableOpacity onPress={gotoselecttickets}>
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

function BackButton(propsbackbutton) {

    const stack2 = propsbackbutton.stack2;

    function gotopopularevents() {
        stack2.navigate('Popularevents')
    }

    return (
        <TouchableOpacity onPress={gotopopularevents}>
            <Icon style={{
            }} name="chevron-back-circle" size={40} color="#FFB300" />
        </TouchableOpacity>
    );
}

function BookMarkButton(propsbookmarkbutton) {

    const stack3 = propsbookmarkbutton.stack3;

    function gotofavourite() {
        stack3.navigate('Favourite')
    }
    return (
        <TouchableOpacity onPress={gotofavourite}>
            <Icon style={{
                marginTop: 5,
            }} name="bookmarks" size={30} color="#FFB300" />
        </TouchableOpacity>
    )
}

const Eventdetails = (propseventdetails) => {

    const stack = propseventdetails.navigation;
    const stack2 = propseventdetails.navigation;
    const stack3 = propseventdetails.navigation;

    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 40,
                flexDirection: 'row',
            }}>
                <BackButton stack2={stack2} />
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginHorizontal: 50,
                    marginBottom: 10,
                }}>
                    Event Details
                </Text>
                <BookMarkButton stack3={stack3} />
            </View>

            <Image
                source={require('../../assets/img/festive.jpg')}
                style={{
                    width: 350,
                    height: 200,
                    borderRadius: 20,
                    marginVertical: 10,
                    marginHorizontal: 10,
                }}
            />

            <View style={{
                marginTop: 10,
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
            <BuyTicketsButton stack={stack} stack2={stack2} stack3={stack3} />
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