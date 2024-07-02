import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const API_URL = 'http://192.168.182.240:3000';

const QrCode = () => {
    const [tickets, setTickets] = useState([]);
    const navigation = useNavigation();
    const qrCodeRef = useRef();

    const fetchEventDetails = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-tickets-data-by-user/1/1`);
            setTickets(response.data);
        } catch (error) {
            console.error('error fetching tickets:', error);
        }
    };

    useEffect(() => {
        fetchEventDetails();
    }, []);

    useEffect(() => {
        if (tickets.length > 0) {
            downloadQRCode();
        }
    }, [tickets]);

    const ticketsString = JSON.stringify(tickets);

    const downloadQRCode = async () => {
        if (Platform.OS === 'android') {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                console.error('storage permission not granted');
                return;
            }
        }

        qrCodeRef.current.toDataURL(async (data) => {
            const fileUri = `${FileSystem.cacheDirectory}qr_code.png`;
            await FileSystem.writeAsStringAsync(fileUri, data, { encoding: FileSystem.EncodingType.Base64 });
            
            const asset = await MediaLibrary.createAssetAsync(fileUri);
            await MediaLibrary.createAlbumAsync('QR Codes', asset, false)
                .then(() => {
                    console.log('qr code saved to gallery');
                })
                .catch((error) => {
                    console.error('error saving to gallery:', error);
                });
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => navigation.navigate('BottomTabNavigation')}
                >
                    <Icon name="close" size={30} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    payment {'\n'} successful
                </Text>
                <View style={styles.qrContainer}>
                    {tickets.length > 0 && (
                        <QRCode
                            value={ticketsString}
                            size={235}
                            color="#000000"
                            backgroundColor="white"
                            getRef={(ref) => (qrCodeRef.current = ref)}
                        />
                    )}
                </View>
                <TouchableOpacity style={styles.downloadButton} onPress={downloadQRCode}>
                    <Text style={styles.downloadButtonText}>Download Qr Code</Text>
                </TouchableOpacity>
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
        height: 430,
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
        height: 260,
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
    downloadButton: {
        marginTop: 20,
        backgroundColor: '#401971',
        padding: 10,
        borderRadius: 5,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
