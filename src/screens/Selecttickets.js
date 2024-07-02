import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

function CheckoutButton({ onPress }) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>
                    Checkout
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const TicketType = ({ type, price, onUpdate }) => {
    const [quantity, setQuantity] = useState(0);

    const decreaseQuantity = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            onUpdate(price, -1);
        }
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
        onUpdate(price, 1);
    };

    return (
        <View style={styles.ticketType}>
            <View style={styles.ticketInfo}>
                <Text style={styles.ticketTypeText}>{type}</Text>
                <Text style={styles.ticketTypePrice}>{price}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decreaseQuantity}>
                    <Text style={styles.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity onPress={increaseQuantity}>
                    <Text style={styles.quantityButton}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const Selecttickets = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { eventId, eventName, eventDate, eventTime, imgUrl } = route.params;
    const [totalPrice, setTotalPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTicketData = async () => {
            try {
                const response = await axios.get(`${API_URL}/get-ticket-data-by-event/${eventId}`);
                setTicketTypes(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching ticket data:", error);
                setLoading(false);
            }
        };

        fetchTicketData();
    }, [eventId]);

    const gotoPaymentdetails = () => {
        if (quantity === 0) {
            Alert.alert("No Tickets Selected", "Please select at least one ticket before proceeding to checkout.");
        } else {
            navigation.navigate('Paymentdetails', { totalPrice });
        }
    };

    const updateSummary = (price, quantityToAdd) => {
        setTotalPrice(totalPrice + (price * quantityToAdd));
        setQuantity(quantity + quantityToAdd);
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#F6BD0F" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Select Tickets</Text>
            </View>

            <View style={styles.eventContainer}>
                <Image source={{ uri: imgUrl }} style={styles.eventImage} />
                <View style={styles.eventDetails}>
                    <Text style={styles.eventName}>{eventName}</Text>
                    <Text style={styles.eventDate}>{eventDate}</Text>
                    <Text style={styles.eventDate}>{eventTime}</Text>
                </View>
            </View>

            <Text style={styles.ticketTypetext}>Ticket Type</Text>

            <View style={styles.ticketTypeTitle}>
                {ticketTypes.map((ticket) => (
                    <TicketType 
                        key={ticket.id} 
                        type={ticket.type_name} 
                        price={ticket.price} 
                        onUpdate={updateSummary} 
                    />
                ))}
            </View>

            <View style={styles.orderSummaryContainer}>
                <Text style={styles.orderSummaryTitle}>Payment Summary</Text>
                <View style={styles.orderSummaryItem}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={styles.orderSummaryText}>Quantity</Text>
                        <Text style={styles.orderSummaryText}>{quantity}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={styles.orderSummaryText}>Total</Text>
                        <Text style={styles.orderSummaryText}>{totalPrice}</Text>
                    </View>
                </View>
            </View>

            <CheckoutButton onPress={gotoPaymentdetails} />
        </View>
    );
};

export default Selecttickets;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        marginTop: 50,
        marginBottom: 10,
    },
    headerText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginHorizontal: 50,
    },
    eventContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
    },
    eventImage: {
        width: 170,
        height: 160,
        borderRadius: 20,
        marginHorizontal: 20,
    },
    eventDetails: {
        marginTop: 20,
        width: 210,
    },
    eventName: {
        fontSize: 25,
        color: '#FFFFFF',
    },
    eventDate: {
        fontSize: 20,
        color: '#C7ADCE',
        marginTop: 10,
    },
    ticketTypeTitle: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    ticketTypetext: {
        fontSize: 25,
        color: '#FFFFFF',
        marginTop: 30,
        marginRight: 200,
    },
    ticketType: {
        backgroundColor: '#C7ADCE',
        width: 350,
        borderRadius: 10,
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ticketInfo: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: -2,
        marginBottom: -2,
    },
    ticketTypeText: {
        fontSize: 20,
        color: '#000000',
    },
    ticketTypePrice: {
        fontSize: 20,
        color: '#000000',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:5,
        justifyContent: 'flex-end',
    },
    quantityButton: {
        fontSize: 20,
        color: '#000000',
        marginHorizontal: 5,
    },
    quantity: {
        fontSize: 20,
        color: '#000000',
        paddingHorizontal: 10,
    },
    orderSummaryContainer: {
        marginRight: 50,
        marginLeft: 30,
    },
    orderSummaryTitle: {
        fontSize: 25,
        color: '#FFFFFF',
        marginTop: 30,
    },
    orderSummaryItem: {
        marginTop: 10,
    },
    orderSummaryText: {
        fontSize: 20,
        color: '#C7ADCE',
        marginBottom: 5,
    },
    checkoutButton: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 300,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 30,
    },
    checkoutButtonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#401971',
    },
});
