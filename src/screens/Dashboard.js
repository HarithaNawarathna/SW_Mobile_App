import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Dashboard = ({ navigation }) => {

  function viewMore() {
    navigation.navigate('Popularevents');
  }

  function more() {
    navigation.navigate('Eventdetails');
  }

  function navigateToSearch() {
    navigation.navigate('Search');
  }

  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: 'row',
        marginTop: 50,
        marginRight: 100,
      }}>
        <Text style={{
          fontSize: 30,
          color: '#FFFFFF',
        }}>
          Hello, --Name--
        </Text>

        <Icon style={{
          marginTop: 8,
          marginLeft: 10,
        }} name="hand-wave" size={30} color="#F6BD0F" />

      </View>
      <Text style={{
        fontSize: 20,
        color: '#C7ADCE',
        marginRight: 130,
        marginTop: 10,
      }}>
        Let's find a good event!
      </Text>

      <TouchableOpacity onPress={navigateToSearch} style={styles.searchButton}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{
            color: '#C7ADCE',
            fontSize: 18,
            marginRight: 150
          }}>
            Search Events
          </Text>
          <Icon name="magnify" size={24} color="#C7ADCE" />
        </View>
      </TouchableOpacity>

      <View style={{
        flexDirection: 'row',
        marginTop: 20,
      }}>

        <Text style={{
          fontSize: 25,
          color: '#FFFFFF',
        }}>
          Popular Events
        </Text>

        <TouchableOpacity onPress={viewMore}>
          <Text style={{
            fontSize: 15,
            color: '#FFFFFF',
            marginLeft: 90,
          }}>
            View More
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerbox}>
        <Image
          source={require('../../assets/img/festive.jpg')}
          style={{
            width: 150,
            height: 160,
            borderRadius: 20,
            marginVertical: 10,
            marginHorizontal: 10,
          }}
        />
        <View style={styles.eventDetails}>
          <Text style={styles.eventDetailText1}>Event Name</Text>
          <Text style={styles.eventDetailText2}>Event Date</Text>
          <TouchableOpacity onPress={more}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.eventDetailText3}>More</Text>
              <Icon style={{marginTop: 20,}} name="chevron-right" size={20} color="#000000" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{
        flexDirection: 'row',
        marginTop: 20,
      }}>
        <Text style={{
          fontSize: 25,
          color: '#FFFFFF',
          marginRight: 130,
        }}>
          Upcoming Events
        </Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={{
          flexDirection: 'row',
          marginTop: 20,
        }}>
          <Image
            source={require('../../assets/img/festive.jpg')}
            style={{
              width: 150,
              height: 160,
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={require('../../assets/img/festive.jpg')}
            style={{
              width: 150,
              height: 160,
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={require('../../assets/img/festive.jpg')}
            style={{
              width: 150,
              height: 160,
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
          <Image
            source={require('../../assets/img/festive.jpg')}
            style={{
              width: 150,
              height: 160,
              borderRadius: 20,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          />
        </View>
      </ScrollView>

    </View>
  )
}

export default Dashboard

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
})
