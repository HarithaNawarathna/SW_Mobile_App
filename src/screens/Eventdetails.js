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
            <View style={styles.buyTicketsButton}>
                <Text style={styles.buyTicketsButtonText}>
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
            <Icon style={styles.backButton} name="chevron-back-circle" size={40} color="#FFB300" />
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
            <Icon style={styles.bookmarkButton} name="bookmarks" size={30} color="#FFB300" />
        </TouchableOpacity>
    )
}

const Eventdetails = (propseventdetails) => {

    const stack = propseventdetails.navigation;
    const stack2 = propseventdetails.navigation;
    const stack3 = propseventdetails.navigation;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <BackButton stack2={stack2} />
                <Text style={styles.headerText}>
                    Event Details
                </Text>
                <BookMarkButton stack3={stack3} />
            </View>

            <Image
                source={require('../../assets/img/festive.jpg')}
                style={styles.eventImage}
            />

            <View style={styles.eventInfoContainer}>
                <Text style={styles.eventName}>
                    Event Name
                </Text>
                <Text style={styles.eventLocation}>
                    Event Location
                </Text>
            </View>

            <View style={styles.aboutContainer}>
                <Text style={styles.aboutHeader}>
                    About
                </Text>
                <Text style={styles.aboutDescription}>
                    ---description---
                </Text>
            </View>

            <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                    <Icon style={styles.detailIcon} name="location-sharp" size={30} color="#FFB300" />
                    <Text style={styles.detailText}>Location</Text>
                </View>
                <View style={styles.detailItem}>
                    <Icon style={styles.detailIcon} name="calendar-clear" size={30} color="#FFB300" />
                    <Text style={styles.detailText}>Date</Text>
                </View>
                <Text style={[styles.detailText, styles.detailTime]}>Time</Text>
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
    header: {
        marginTop: 40,
        flexDirection: 'row',
    },
    headerText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginLeft: 20,
        marginBottom: 10,
    },
    backButton: {
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
    bookmarkButton: {
        marginTop: 5,
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
        marginRight: 140,
    },
    eventName: {
        fontSize: 28,
        color: '#FFFFFF',
    },
    eventLocation: {
        fontSize: 25,
        color: '#C7ADCE',
    },
    aboutContainer: {
        marginTop: 50,
        marginRight: 170,
    },
    aboutHeader: {
        fontSize: 23,
        color: '#FFFFFF',
    },
    aboutDescription: {
        fontSize: 20,
        color: '#C7ADCE',
    },
    detailsContainer: {
        marginTop: 30,
        marginRight: 170,
    },
    detailItem: {
        flexDirection: 'row',
    },
    detailIcon: {
    },
    detailText: {
        fontSize: 23,
        color: '#FFFFFF',
        marginLeft: 10,
    },
    detailTime: {
        marginLeft: 40,
        marginTop: -12,
    },
});
