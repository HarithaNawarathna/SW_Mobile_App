import React from 'react';
import { StyleSheet, Text, View, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native'; 

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('Username is required')
    .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/, 
      'Invalid email'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    ),
});

const Login = () => {
  const navigation = useNavigation(); 

  const handleLogin = (values) => {
    navigation.navigate('Dashboard');
  };

  return (
    <KeyboardAwareScrollView keyboardShouldPersistTaps="never">
      <View style={styles.container}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.logo}>{'Epic\nEventify'}</Text>

        <Formik
          initialValues={{ username: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.form}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#000000"
                style={styles.input}
                onChangeText={handleChange('username')}
                onBlur={handleBlur('username')}
                value={values.username}
              />
              {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}

              <TextInput
                placeholder="Password"
                placeholderTextColor="#000000"
                secureTextEntry={true}
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
                <Text style={styles.forgotPassword}>Forget Password</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
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
