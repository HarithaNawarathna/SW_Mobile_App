import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StripeProvider, CardField } from '@stripe/stripe-react-native';

function ConfirmButton({ navigation }) {
    const gotoVerify = () => {
        navigation.navigate('Paymentverification');
    }

    return (
        <TouchableOpacity onPress={gotoVerify}>
            <View style={styles.confirmButton}>
                <Text style={styles.confirmButtonText}>
                    Confirm
                </Text>
            </View>
        </TouchableOpacity>
    );
}

function BackButton({ navigation }) {
    const gotoeventdetails = () => {
        navigation.goBack();
    }

    return (
        <TouchableOpacity onPress={gotoeventdetails}>
            <Icon name="chevron-back-circle" size={40} color="#F6BD0F" />
        </TouchableOpacity>
    );
}

const Paymentdetails = ({ navigation }) => {
    const [cardHolderEmail, setCardHolderEmail] = useState('');

    return (
        <StripeProvider
            publishableKey="pk_test_51ObQ74EVdCsIjFayjxfFn84AgbNhpwKqQjOVfmGQGscgNz7NuGC5zqyku85cWRZRvjm74My2vPJTYu28fdszWl4600rUJdhZuh"
        // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <BackButton navigation={navigation} />
                    <Text style={styles.headerText}>Payment Details</Text>
                </View>
                <View>
                    <Text style={styles.visaText}>We are Accepting</Text>
                    <Image
                        source={require('../../assets/img/Visa-Logo.png')}
                        style={{
                            width: 200,
                            height: 60,
                            marginBottom: 10,
                            marginTop: 20,
                            alignContent: 'center',
                        }}
                    />
                </View>

                <View style={styles.inputContainer}>

                    <Text style={styles.inputLabel}>Card Holder Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setCardHolderEmail}
                        value={cardHolderEmail}
                        placeholder="Enter email"
                        keyboardType="email-address"
                    />
                </View>
                <View style={styles.cardFieldContainer}>
                    <Text style={styles.cardFieldLabel}>Card Details</Text>
                    <CardField
                        postalCodeEnabled={true}
                        placeholder={{
                            number: '4242 4242 4242 4242',
                        }}
                        cardStyle={{
                            backgroundColor: '#FFFFFF',
                            textColor: '#000000',
                        }}
                        style={{
                            width: '100%',
                            height: 50,
                            marginVertical: 30,
                        }}
                        onCardChange={(cardDetails) => {
                            // console.log('cardDetails', cardDetails);
                        }}
                        onFocus={(focusedField) => {
                            // console.log('focusField', focusedField);
                        }}
                    />
                </View>
                <ConfirmButton navigation={navigation} />
            </View>
        </StripeProvider>
    );
}

export default Paymentdetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        marginTop: 50,
    },
    headerText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginHorizontal: 40,
    },
    visaText: {
    fontSize: 20,
    color: '#F6BD0F',
    marginTop: 20,
    marginLeft: -60,
},

    inputContainer: {
        marginTop: 20,
    },
    inputLabel: {
        fontSize: 20,
        color: '#C7ADCE',
        marginBottom: 20,
        marginTop: 30,
    },
    input: {
        width: 350,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,
        fontSize: 18,
    },
    cardFieldLabel: {
        fontSize: 20,
        color: '#C7ADCE',
        marginTop: 40,
        marginBottom: -10,
    },
    cardFieldContainer: {
        width: 350,
    },
    confirmButton: {
        backgroundColor: '#F6BD0F',
        height: 40,
        width: 300,
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 90,
    },
    confirmButtonText: {
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
