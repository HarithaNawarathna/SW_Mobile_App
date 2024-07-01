import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../App';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

function Changepassfield() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New passwords do not match");
      return;
    }

    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const response = await axios.put(`${API_URL}/change-password`, {
        userId: user_id,
        currentPassword,
        newPassword,
        confirmPassword
      });

      if (response.status === 200) {
        Alert.alert("Success", "Password updated successfully", [
          { text: "OK", onPress: () => navigation.navigate('Editacc') }
        ]);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      if (error.response && error.response.status === 401) {
        Alert.alert("Error", "Invalid current password");
      } else {
        Alert.alert("Error", "Failed to update password");
      }
    }
  };

  return (
    <View>
      <View style={styles.inputField}>
        <TextInput
          placeholder='Enter Old Password'
          placeholderTextColor={'#555555'}
          style={styles.inputText}
          secureTextEntry={true}
          value={currentPassword}
          onChangeText={setCurrentPassword}
        />
      </View>

      <View style={styles.inputField}>
        <TextInput
          placeholder='Enter New Password'
          placeholderTextColor={'#555555'}
          style={styles.inputText}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      </View>

      <View style={styles.inputField}>
        <TextInput
          placeholder='Confirm Password'
          placeholderTextColor={'#555555'}
          style={styles.inputText}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>
      <BottomButtons3 navigation={navigation} handleChangePassword={handleChangePassword} />
    </View>
  );
}

function BottomButtons3({ navigation, handleChangePassword }) {
  const { signOut } = useContext(AuthContext);

  const gotoEditAcc = () => {
    navigation.navigate('Editacc');
  };

  const gotoLogin = () => {
    signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity onPress={gotoEditAcc} style={styles.button}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const Changepass = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Image
        source={require('../../assets/img/userprofile.png')}
        style={styles.profileImage}
      />
      <Changepassfield />
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 20,
    marginTop: 80,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#F6BD0F',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  inputField: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 40,
    width: 350,
    marginVertical: 15,
    paddingLeft: 15,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 18,
    color: '#000000',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 20,
    color: '#401971',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F6BD0F',
    height: 50,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default Changepass;
