import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CircleWithText = ({ number }) => {
  return (
    <View style={styles.circleContainer}>
      <Text style={styles.circleText}>{number}</Text>
    </View>
  );
}


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

  function confirmLogout() {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes', onPress: () => navigation.navigate('Login') },
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

      <View style={styles.circleRow}>
        <CircleWithText number="12" />
        <CircleWithText number="10" />
      </View>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>Attended</Text>
        <Text style={styles.statsText}>Upcoming</Text>
      </View>

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
  circleRow: {
    flexDirection: 'row',
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F6BD0F',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  circleText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
  statsRow: {
    flexDirection: 'row',
  },
  statsText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
    marginHorizontal: 50,
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
