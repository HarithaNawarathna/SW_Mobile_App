import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { StripeProvider, CardField, useConfirmPayment } from '@stripe/stripe-react-native';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';

const API_URL = 'http://192.168.182.240:3000';

const Paymentdetails = () => {
  const [cardHolderEmail, setCardHolderEmail] = useState('');
  const { confirmPayment, loading } = useConfirmPayment();
  const [cardDetails, setCardDetails] = useState(null);
  const navigation = useNavigation();
  const route = useRoute();
  const totalPrice = route.params?.totalPrice || 0;

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await axios.post(`${API_URL}/create-payment-intent`, {
        currency: 'usd',
        amount: totalPrice,
      });
      const data = response.data;
      const { clientSecret } = data;
      return clientSecret;
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePayPress = async () => {
    if (!cardHolderEmail || !validateEmail(cardHolderEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (!cardDetails?.complete) {
      Alert.alert('Incomplete Card Details', 'Please enter complete card details.');
      return;
    }

    try {
      const clientSecret = await fetchPaymentIntentClientSecret();
      const billingDetails = {
        email: cardHolderEmail,
      };
      const { paymentIntent, error } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        paymentMethodData: {
          billingDetails,
          card: cardDetails,
        },
      });

      if (error) {
        console.error('Payment confirmation error', error);
        Alert.alert('Payment Error', error.message);
      } else if (paymentIntent) {
        const paymentData = {
          payment_id: paymentIntent.id,
          user_id: 456,
          Email: cardHolderEmail,
          amount: paymentIntent.amount,
        };

        axios.post(`${API_URL}/savepayment`, paymentData)
          .then(response => {
            console.log('Response:', response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });

        navigation.navigate('Paymentverification');
      }
    } catch (error) {
      console.error('Error handling payment:', error);
      Alert.alert('Payment Error', 'An error occurred while processing the payment.');
    }
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51ObQ74EVdCsIjFayjxfFn84AgbNhpwKqQjOVfmGQGscgNz7NuGC5zqyku85cWRZRvjm74My2vPJTYu28fdszWl4600rUJdhZuh"
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Payment Details</Text>
        </View>
        <View style={styles.acceptingContainer}>
          <Text style={styles.visaText}>We are Accepting</Text>
          <Image
            source={require('../../assets/img/Visa-Logo.png')}
            style={styles.visaLogo}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Card Holder Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setCardHolderEmail}
            value={cardHolderEmail}
            placeholder="Enter email"
            placeholderTextColor="#AAAAAA"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.cardFieldContainer}>
          <Text style={styles.cardFieldLabel}>Card Details</Text>
          <CardField
            postalCodeEnabled={false}
            placeholder={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#FFFFFF',
              textColor: '#000000',
            }}
            style={styles.cardField}
            onCardChange={(cardDetails) => setCardDetails(cardDetails)}
            onFocus={(focusedField) => {}}
          />
        </View>
        <TouchableOpacity onPress={handlePayPress} style={styles.confirmButton} disabled={loading}>
          <Text style={styles.confirmButtonText}>{loading ? 'Processing...' : 'Confirm'}</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 50,
  },
  headerText: {
    fontSize: 30,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  acceptingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  visaText: {
    fontSize: 20,
    color: '#F6BD0F',
    marginTop: 30,
  },
  visaLogo: {
    width: 200,
    height: 60,
    marginTop: 10,
    marginBottom: 50,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
  },
  inputLabel: {
    fontSize: 20,
    color: '#C7ADCE',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    color: '#000000',
  },
  cardFieldContainer: {
    width: '100%',
  },
  cardFieldLabel: {
    fontSize: 20,
    color: '#C7ADCE',
    marginTop: 20,
    marginBottom: 10,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  confirmButton: {
    backgroundColor: '#F6BD0F',
    height: 50,
    width: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 80,
  },
  confirmButtonText: {
    fontSize: 20,
    color: '#401971',
    fontWeight: 'bold',
  },
});

export default Paymentdetails;
