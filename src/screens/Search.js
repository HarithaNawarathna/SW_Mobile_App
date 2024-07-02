import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

const API_URL = 'http://192.168.182.240:3000';

const Search = () => {
  const navigation = useNavigation();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/getallevents`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events data:', error);
      });
  }, []);

  const filteredEvents = events.filter(event => {
    const queryWords = searchQuery.toLowerCase().split(' ');
    const eventWords = event.event_name.toLowerCase().split(' ');
    return queryWords.every((queryWord, index) => {
      return eventWords[index] && eventWords[index].startsWith(queryWord);
    });
  });

  function gotoEventDetails(eventId) {
    navigation.navigate('Eventdetails', { eventId });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Events
        </Text>
        <Icon style={styles.headerIcon} name="calendar-check" size={30} color="#FDD835" />
      </View>
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#757575" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search by event name"
          placeholderTextColor="#757575"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={Keyboard.dismiss}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="times" size={20} color="#757575" style={styles.cancelIcon} />
          </TouchableOpacity>
        ) : null}
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        {filteredEvents.map((event, index) => (
          <TouchableOpacity key={index} onPress={() => gotoEventDetails(event.id)}>
            <View style={styles.containerbox}>
              <Image
                source={{ uri: event.image_url }}
                style={styles.image}
              />
              <View style={styles.eventDetails}>
                <Text style={styles.eventDetailText1}>{event.event_name}</Text>
                <Text style={styles.eventDetailText2}>{event.date}</Text>
                <Text style={styles.eventDetailText2}>{event.time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </KeyboardAwareScrollView>
      <View style={styles.bottomSpacer} />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: 30,
  },
  headerText: {
    fontSize: 30,
    color: '#FFFFFF',
  },
  headerIcon: {
    marginTop: 7,
    marginLeft: 10,
  },
  searchBar: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  cancelIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#000000',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  containerbox: {
    marginVertical: 5, 
    alignItems: 'center',
    backgroundColor: '#C7ADCE',
    width: 340,
    height: 220,
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute', 
  },
  eventDetails: {
    position: 'absolute', 
    bottom: 10, 
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 10,
    borderRadius: 10,
  },
  eventDetailText1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  eventDetailText2: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  bottomSpacer: {
    marginTop: 10,
    marginBottom: 10,
  },
});
