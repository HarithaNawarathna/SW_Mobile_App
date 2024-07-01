import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../App';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../config';
import axios from 'axios';
import { set } from 'firebase/database';

const API_URL = 'http://192.168.182.240:3000';

const TicketsButton = () => {
  const navigation = useNavigation();

  function gotoMytickets() {
    navigation.navigate('Mytickets');
  }

  return (
    <TouchableOpacity onPress={gotoMytickets} style={styles.ticketsbuttonContainer}>
      <Icon name="ticket" size={30} color="#FFB300" />
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
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = await AsyncStorage.getItem('user_id');
        if (user_id) {
          const response = await axios.get(`${API_URL}/get-user/${user_id}`);
          setUsername(response.data[0].name);
          setImage(response.data[0].profile_image);
        } else {
          console.error('User ID not found in AsyncStorage');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
        
    }
};

const uploadImage = async () => {
    setUploading(true);

    try {
        const user_id = await AsyncStorage.getItem('user_id');
        if (!image) {
            throw new Error('No image selected');
        }

        const response = await fetch(image);
        const blob = await response.blob();

        const filename = image.substring(image.lastIndexOf('/') + 1);
        const ref = firebase.storage().ref().child(filename);

        const snapshot = await ref.put(blob);
        const downloadURL = await snapshot.ref.getDownloadURL();

        await axios.put(`${API_URL}/upload-image`, {
            user_id: user_id, 
            img_url: downloadURL,
        });

        setUploading(false);
        Alert.alert('Success', 'Image uploaded successfully');
        setImage(null);
    } catch (error) {
        console.error('Error uploading image:', error.message);
        setUploading(false);
        Alert.alert('Error', error.message);
    }
};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <Text style={styles.profileName}>{username}</Text>
      <TouchableOpacity onPress={pickImage}>
        <View style={styles.imageContainer}>
          {image && (
            <Image source={{ uri: image }} style={styles.profileImage} />
          )}
          {!image && (
            <Icon name="camera" size={40} color="#FFFFFF" />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
      </TouchableOpacity>
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
    paddingTop: 60,
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#3A155B',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 4,
    borderColor: '#F6BD0F',
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#FFFFFF',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#522D80',
  },
  profileName: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#3A155B',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  ticketsbuttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#3A155B',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: '#FFFFFF',
    marginHorizontal: 10,
  },
  buttonTextSmall: {
    fontSize: 16,
    color: '#C7ADCE',
  },
  logoutButtonContainer: {
    marginTop: 20,
    width: '80%',
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#3A155B',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadButton: {
    backgroundColor: '#F6BD0F',
    height: 40,
    width: 160,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 40,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#401971',
    fontWeight: 'bold',
  },
});

export default Profile;