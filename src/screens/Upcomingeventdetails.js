import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

const Upcomingeventdetails = () => {
    const route = useRoute();
    const id = route.params?.eventId || null;
    const [event, setEvent] = useState(null);

    function BuyTicketsButton() {
        const navigation = useNavigation();

        function gotoselecttickets() {
            navigation.navigate('Selecttickets');
        }

        return (
            <TouchableOpacity onPress={gotoselecttickets}>
                <View style={styles.buyTicketsButton}>
                    <Text style={styles.buyTicketsButtonText}>
                        Buy Tickets
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    function BookMarkButton() {
        const navigation = useNavigation();

        function gotofavourite() {
            navigation.navigate('Favourite');
        }

        return (
            <TouchableOpacity onPress={gotofavourite}>
                <Icon style={styles.bookmarkButton} name="bookmarks" size={30} color="#FFB300" />
            </TouchableOpacity>
        );
    }

    useEffect(() => {
        axios.get(`http://192.168.77.240:3000/geteventdatabyid/${id}`)
            .then(response => {
                setEvent(response.data[0]);
            })
            .catch(error => {
                console.error('Error fetching event data:', error);
            });
    }, [id]);

    if (!event) {
        return <Text>Loading...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>
                    Event Details
                </Text>
                <BookMarkButton />
            </View>

            <Image
                source={{ uri: event.image_url }}
                style={styles.eventImage}
            />
            <View style={styles.eventInfoContainer}>
                <Text style={styles.eventName}>
                    {event.event_name}
                </Text>
                <Text style={styles.eventLocation}>
                    {event.location}
                </Text>
            </View>

            <View style={styles.aboutContainer}>
                <Text style={styles.aboutDescription}>
                    {event.about}
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Icon style={styles.detailIcon} name="location-sharp" size={25} color="#FFB300" />
                    <Text style={styles.detailText}>{event.location}</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon style={styles.detailIcon} name="calendar-clear" size={25} color="#FFB300" />
                    <Text style={styles.detailText}>{event.date}</Text>
                </View>
                <Text style={[styles.detailText, styles.detailTime]}>{event.time}</Text>
            </View>
            <BuyTicketsButton />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
    header: {
        marginTop: 40,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginBottom: 10,
        marginHorizontal: 40,
    },
    eventImage: {
        width: 350,
        height: 200,
        borderRadius: 20,
        marginVertical: 10,
        marginHorizontal: 10,
    },
    eventInfoContainer: {
        marginTop: 10,
        alignItems: 'flex-start',
        width: '80%',
    },
    eventName: {
        fontSize: 28,
        color: '#FFFFFF',
        textAlign: 'left',
    },
    eventLocation: {
        fontSize: 25,
        color: '#C7ADCE',
        textAlign: 'left',
    },
    aboutContainer: {
        marginTop: 50,
        marginHorizontal: 30,
        marginBottom: 20,
    },
    aboutDescription: {
        fontSize: 20,
        color: '#C7ADCE',
    },
    detailsContainer: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    detailItem: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
    },
    detailText: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    detailTime: {
        marginLeft: 35,
    },
    buyTicketsButton: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 300,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 50,
    },
    buyTicketsButtonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Upcomingeventdetails;
