import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; 
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.182.240:3000';

const Dashboard = () => {
  const navigation = useNavigation(); 
  const [popularEvents, setPopularEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    // Fetch username from AsyncStorage
    AsyncStorage.getItem('username')
      .then((value) => setUsername(value)) // Set the username state
      .catch((error) => console.error('Error fetching username:', error));

    // Fetch popular events from the backend API
    axios.get(`${API_URL}/getmostpopularevent`)
      .then(response => {
        setPopularEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching popular events:', error);
      });

    // Fetch upcoming events from the backend API
    axios.get(`${API_URL}/getupcomingeventdata`)
      .then(response => {
        setUpcomingEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching upcoming events:', error);
      });
  }, []);


  function viewMore() {
    navigation.navigate('Popularevents');
  }

  function navigateToEventDetails(eventId) {
    navigation.navigate('Eventdetails', { eventId });
  }

  function navigateToSearch() {
    navigation.navigate('Search');
  }

  function navigateToUpcomingEventDetails(eventId) {
    navigation.navigate('Upcomingeventdetails', { eventId });
  }

  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Welcome, {username}!
        </Text>
        <Icon style={styles.waveIcon} name="hand-wave" size={30} color="#F6BD0F" />
      </View>

      <Text style={styles.subTitle}>
        Let's find a good event!
      </Text>
      {/* Button to navigate to Search Screen */}
      <TouchableOpacity onPress={navigateToSearch} style={styles.searchButton}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#C7ADCE', fontSize: 18, marginRight: 150 }}>
            Search Events
          </Text>
          <Icon name="magnify" size={24} color="#C7ADCE" />
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={{ fontSize: 25, color: '#FFFFFF' }}>
          Popular Events
        </Text>
        <TouchableOpacity onPress={viewMore}>
          <Text style={styles.viewMoreText}>
            View More
          </Text>
        </TouchableOpacity>
      </View>

      {/* Render the popular events */}
      {popularEvents.map((event, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToEventDetails(event.id)}>
          <View style={styles.containerbox}>
            <Image
              source={{ uri: event.image_url }}
              style={{ width: 150, height: 160, borderRadius: 20, marginVertical: 10, marginHorizontal: 10 }}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventDetailText1}>{event.event_name}</Text>
              <Text style={styles.eventDetailText2}>{new Date(event.date).toDateString()}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.eventDetailText3}>More</Text>
                <Icon style={{ marginTop: 20 }} name="chevron-right" size={20} color="#000000" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={{ flexDirection: 'row', marginTop: 20 }}>
        <Text style={styles.upcomingEventsText}>
          Upcoming Events
        </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 20 }}>
          {upcomingEvents.map((event, index) => (
            <TouchableOpacity key={index} onPress={() => navigateToUpcomingEventDetails(event.id)}>
              <Image
                source={{ uri: event.image_url }}
                style={{ width: 200, height: 200, borderRadius: 20, marginVertical: 10, marginHorizontal: 10 }}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
  },
  containerbox: {
    backgroundColor: '#C7ADCE',
    flexDirection: 'row',
    width: 340,
    height: 180,
    borderRadius: 20,
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  eventDetails: {
    marginLeft: 10,
    marginTop: 20,
  },
  eventDetailText1: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    width: 150,
  },
  eventDetailText2: {
    fontSize: 15,
    color: '#000000',
    marginTop: 20,
  },
  eventDetailText3: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 50,
    marginHorizontal: 70,
    marginLeft: -20,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  waveIcon: {
    marginTop: 60,
    marginLeft: 1,
  },
  subTitle: {
    fontSize: 20,
    color: '#C7ADCE',
    marginRight: 130,
    marginTop: 10,
  },
  viewMoreText: {
    fontSize: 15,
    color: '#FFFFFF',
    marginLeft: 90,
  },
  upcomingEventsText: {
    fontSize: 25,
    color: '#FFFFFF',
    marginRight: 130,
  },
});

export default Dashboard;
