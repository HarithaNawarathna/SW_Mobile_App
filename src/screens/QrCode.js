import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const API_URL = 'http://192.168.182.240:3000';

const QrCode = () => {
    const [tickets, setTickets] = useState([]);
    const navigation = useNavigation();

    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-tickets-data-by-user/1/1`);
            console.log(response.data);
            setTickets(response.data);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, []);

    const ticketsString = JSON.stringify(tickets);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <Icon name="close" size={30} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Payment {'\n'} Successful
                </Text>
                <View style={styles.qrContainer}>
                    {tickets.length > 0 && (
                        <QRCode
                            value={ticketsString}
                            size={235}
                            color="#000000"
                            backgroundColor="white"
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

export default QrCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#401971',
        paddingTop: 20,
        marginTop: -25,
    },
    card: {
        marginVertical: 200,
        width: '73%',
        height: 380,
        alignItems: 'center',
        backgroundColor: '#C7ADCE',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 5,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 15,
        elevation: 20,
    },
    qrContainer: {
        paddingTop: 25,
    },
    headerText: {
        fontSize: 22,
        color: '#000000',
        marginBottom: 5,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
        zIndex: 1,
    },
});
