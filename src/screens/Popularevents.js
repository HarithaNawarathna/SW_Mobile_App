import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Fontisto'
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

const Popularevents = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);

    useEffect(() => {
      
        axios.get(`${API_URL}/getallevents`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                console.error('Error fetching events data:', error);
            });
    }, []);

    function gotoEventDetails(eventId) {
        navigation.navigate('Eventdetails', { eventId });
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    Popular Events
                </Text>
                <Icon style={styles.icon} name="fire" size={30} color="#FFB300" />
            </View>

            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                {events.map((event, index) => (
                    <TouchableOpacity key={index} onPress={() => gotoEventDetails(event.id)}>
                        <View style={styles.containerbox}>
                            <Image
                                source={{ uri: event.image_url }}
                                style={{
                                    width: 150,
                                    height: 160,
                                    borderRadius: 20,
                                    marginVertical: 10,
                                    marginHorizontal: 10,
                                }}
                            />
                            <View style={styles.eventDetails}>
                                <Text style={styles.eventDetailText1}>{event.event_name}</Text>
                                <Text style={styles.eventDetailText2}>{event.date}</Text>
                                <Text style={styles.eventDetailText2}>{event.time}</Text>
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
                <Text style={{ color: '#FFFFFF' }}></Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#401971',
      alignItems: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
    },
    headerText: {
      fontSize: 30,
      color: '#FFFFFF',
      marginLeft: 10,
      marginTop: 50,
      marginBottom: 10,
    },
    icon: {
      marginTop: 53,
      marginLeft: 10,
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
      marginTop: 10,
    },
    eventDetailText1: {
      fontSize: 20,
      color: '#000000',
      fontWeight: 'bold',
      width: 150,
    },
    eventDetailText2: {
      fontSize: 15,
      color: '#000000',
      marginTop: 15,
    },
    eventDetailText3: {
      fontSize: 15,
      color: '#000000',
      fontWeight: 'bold',
      marginTop: 20,
    },
});

export default Popularevents;
