import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
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
    AsyncStorage.getItem('username')
      .then((value) => setUsername(value))
      .catch((error) => console.error('Error fetching username:', error));

    axios.get(`${API_URL}/getmostpopularevent`)
      .then(response => {
        setPopularEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching popular events:', error);
      });

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
          Hello, {username}!
        </Text>
        <Icon style={styles.waveIcon} name="hand-wave" size={30} color="#F6BD0F" />
      </View>

      <Text style={styles.subTitle}>
        Let's find a good event!
      </Text>

      <TouchableOpacity onPress={navigateToSearch} style={styles.searchButton}>
        <View style={styles.searchButtonContent}>
          <Text style={styles.searchButtonText}>
            Search Events
          </Text>
          <Icon name="magnify" size={24} color="#C7ADCE" />
        </View>
      </TouchableOpacity>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Popular Events
        </Text>
        <TouchableOpacity onPress={viewMore}>
          <Text style={styles.viewMoreText}>
            View More
          </Text>
        </TouchableOpacity>
      </View>

      {popularEvents.map((event, index) => (
        <TouchableOpacity key={index} onPress={() => navigateToEventDetails(event.id)}>
          <View style={styles.containerbox}>
            <Image
              source={{ uri: event.image_url }}
              style={styles.eventImage}
            />
            <View style={styles.eventDetails}>
              <Text style={styles.eventDetailText1}>{event.event_name}</Text>
              <Text style={styles.eventDetailText2}>{new Date(event.date).toDateString()}</Text>
              <View style={styles.moreContainer}>
                <Text style={styles.eventDetailText3}>More</Text>
                <Icon style={styles.chevronIcon} name="chevron-right" size={20} color="#000000" />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Upcoming Events
        </Text>
      </View>

      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {upcomingEvents.map((event, index) => (
          <TouchableOpacity key={index} onPress={() => navigateToUpcomingEventDetails(event.id)}>
            <Image
              source={{ uri: event.image_url }}
              style={styles.upcomingEventImage}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
    padding: 10,
  },
  containerbox: {
    backgroundColor: '#C7ADCE',
    flexDirection: 'row',
    width: '90%',
    height: 180,
    borderRadius: 20,
    marginTop: 20,
  },
  searchButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: '90%',
  },
  searchButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchButtonText: {
    color: '#C7ADCE',
    fontSize: 18,
  },
  eventImage: {
    width: 150,
    height: 160,
    borderRadius: 20,
    margin: 10,
  },
  eventDetails: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: 10,
  },
  eventDetailText1: {
    fontSize: 20,
    color: '#000000',
    fontWeight: 'bold',
    flexWrap: 'wrap',
    width: 150,
  },
  eventDetailText2: {
    fontSize: 15,
    color: '#000000',
    marginTop: 10,
  },
  eventDetailText3: {
    fontSize: 15,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10,
  },
  title: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    width: '90%',
    justifyContent: 'flex-start',
  },
  waveIcon: {
    marginLeft: 10,
  },
  subTitle: {
    fontSize: 20,
    color: '#C7ADCE',
    marginTop: 10,
    width: '90%',
    textAlign: 'left',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 25,
    color: '#FFFFFF',
  },
  viewMoreText: {
    fontSize: 15,
    color: '#FFFFFF',
  },
  scrollContainer: {
    paddingVertical: 10,
  },
  upcomingEventImage: {
    width: 200,
    height: 200,
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  moreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevronIcon: {
    marginTop: 12,
  },
});

export default Dashboard;
