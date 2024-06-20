import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const navigation = useNavigation();

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email: values.email,
        password: values.password
      });
      
      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('username', response.data.username);
        navigation.navigate('BottomTabNavigation');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        Alert.alert("Error", error.response.data);
      } else {
        console.error(error);
        Alert.alert("Error", "Failed to login");
      }
    }
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.logo}>{'Epic\nEventify'}</Text>

        {/* Formik form for handling form inputs and validation */}
        <Formik
          initialValues={{ email: '', password: '' }} // Initial form values
          validationSchema={LoginSchema} // Validation for form inputs
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address" // Set keyboard type to email
                autoCapitalize="none" // Disable auto-capitalization
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry={true} // Hide password characters
                style={styles.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Resetpass1')}>
                <Text style={styles.forgotPassword}>Forgot Password</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('Createacc')}>
                <Text style={styles.noAccount}>Don't have an account?</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>

        <StatusBar style="auto" />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
    justifyContent: 'center',
    height: 887,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 80,
    marginTop: 100,
  },
  logo: {
    fontSize: 60,
    color: '#F6BD0F',
    fontWeight: 'bold',
    lineHeight: 59,
  },
  form: {
    width: '80%',
    marginTop: 50,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 40,
    marginVertical: 10,
    paddingLeft: 20,
    fontSize: 18,
    color: '#000000',
  },
  button: {
    backgroundColor: '#F6BD0F',
    borderRadius: 20,
    height: 40,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    fontSize: 25,
    color: '#000000',
  },
  forgotPassword: {
    fontSize: 18,
    color: '#C69CD1',
    marginTop: 10,
    textAlign: 'center',
  },
  noAccount: {
    fontSize: 18,
    color: '#C69CD1',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 113,
  },
  error: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
