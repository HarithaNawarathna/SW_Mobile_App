import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Popularevents = ({ navigation }) => {
    function gotoeventdetails() {
        navigation.navigate('Eventdetails');
    }

    // Array of popular event names
    const popularEvents = [
        { name: "Event 1", date: "Date 1" },
        { name: "Event 2", date: "Date 2" },
        { name: "Event 3", date: "Date 3" },
        { name: "Event 4", date: "Date 4" },
        // Add more events as needed
    ];

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',

            }}>
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginLeft: 10,
                    marginTop: 50,
                    marginBottom: 10,
                }}>
                    Popular Events
                </Text>
                <Icon style={{
                    marginTop: 53,
                    marginLeft: 10,
                }} name="fire" size={30} color="#FFB300" />
            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                {popularEvents.map((event, index) => (
                    <TouchableOpacity key={index} onPress={gotoeventdetails}>
                        <View style={styles.containerbox}>
                            <Image
                                source={require('../../assets/img/festive.jpg')}
                                style={{
                                    width: 150,
                                    height: 160,
                                    borderRadius: 20,
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                }}
                            />
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventDetailText1}>{event.name}</Text>
                                <Text style={styles.eventDetailText2}>{event.date}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.eventDetailText3}>More</Text>
                                    <Icon style={{ marginTop: 20, }} name="angle-right" size={15} color="#000000" />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </KeyboardAwareScrollView>

            <View style={{
                marginTop: 10,
                marginBottom: 10,

            }}>
                <Text style={{
                    color: '#FFFFFF',
                }}>--here comes the bottom tab navigation--</Text>
            </View>

        </View>
    )
}

export default Popularevents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
    containerbox: {
        backgroundColor: '#C7ADCE',
        flexDirection: 'row',
        width: 340,
        height: 180,
        borderRadius: 20,
        marginTop: 20,
    },
    eventDetails: {
        marginLeft: 10,
        marginTop: 20,
    },
    eventDetailText1: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold',

    },
    eventDetailText2: {
        fontSize: 15,
        color: '#000000',
        marginTop: 20,
    },
    eventDetailText3: {
        fontSize: 15,
        color: '#000000',
        fontWeight: 'bold',
        marginTop: 20,
    },
})
