import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

const TicketsButton = () => {
  const navigation = useNavigation();

  function gotoMytickets() {
    navigation.navigate('Mytickets');
  }

  return (
    <TouchableOpacity onPress={gotoMytickets} style={styles.ticketsbuttonContainer}>
      <Icon name="ticket" size={40} color="#FFB300" />
      <Text style={styles.buttonText}>Tickets</Text>
    </TouchableOpacity>
  );
}

const EditProfileButton = () => {
  const navigation = useNavigation();

  function gotoEditacc() {
    navigation.navigate('Editacc');
  }

  return (
    <TouchableOpacity onPress={gotoEditacc} style={styles.buttonContainer}>
      <Icon name="pencil-sharp" size={25} color="#C7ADCE" />
      <Text style={styles.buttonTextSmall}>Edit Profile</Text>
    </TouchableOpacity>
  );
}

const LogoutButton = () => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);

  function confirmLogout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => signOut() },
      ],
      { cancelable: false }
    );
  }

  return (
    <TouchableOpacity onPress={confirmLogout} style={[styles.buttonContainer, styles.logoutButtonContainer]}>
      <Icon name="log-out-outline" size={30} color="#C7ADCE" />
      <Text style={[styles.buttonText, styles.buttonTextSmall]}>Logout</Text>
    </TouchableOpacity>
  );
}

const Profile = () => {
  const [username, setUsername] = React.useState('');

  useEffect(() => {
    AsyncStorage.getItem('username')
    .then((value) => setUsername(value))
    .catch((error) => console.error('Error fetching username:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/userprofile.png')}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>
        {username}
      </Text>

      <TicketsButton />
      <EditProfileButton />
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#F6BD0F',
    marginBottom: 10,
    marginTop: 100,
  },
  profileName: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center', 
  },
  ticketsbuttonContainer: {
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 30,
    color: '#FFFFFF',
    marginHorizontal: 10,
  },
  buttonTextSmall: {
    fontSize: 20,
    color: '#C7ADCE',
    marginTop: -5, 
  },
  logoutButtonContainer: {
    marginTop: 30,
    alignItems: 'center', 
  },
});

export default Profile;
