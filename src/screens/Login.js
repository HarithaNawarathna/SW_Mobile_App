import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from "expo-secure-store";
import Icon from 'react-native-vector-icons/Feather';

import { AuthContext } from '../../App';

const API_URL = 'http://192.168.182.240:3000';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
});

const Login = () => {
  const { signIn } = React.useContext(AuthContext);
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, {
        email: values.email,
        password: values.password
      });

      if (response.status === 200) {
        await AsyncStorage.setItem('accessToken', response.data.accessToken);
        await SecureStore.setItemAsync('accessToken', response.data.accessToken);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        await AsyncStorage.setItem('username', response.data.username);
        await AsyncStorage.setItem('user_id', String(response.data.user_id));
        signIn();
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

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
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
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#000000"
                  secureTextEntry={!passwordVisible}
                  style={[styles.input, styles.passwordInput]}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Icon name={passwordVisible ? "eye-off" : "eye"} size={20} color="#000000" />
                </TouchableOpacity>
              </View>
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
    paddingRight: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    height: 40,
    marginVertical: 10,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  icon: {
    position: 'absolute',
    right: 10,
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
