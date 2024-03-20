import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Dashboard = () => {
  return (
    <View style={styles.container}>

      <View style={{
        flexDirection: 'row',
        marginTop: 70,
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
      }} name="hand-wave" size={30} color="#FDD835" />

        <Image
          source={require('../../assets/img/userprofile.png')}
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: '#F6BD0F',
            marginLeft: 60,
          }}
        />
      </View>
      <Text style={{
        fontSize: 20,
        color: '#C7ADCE',
        marginRight: 130,
        marginTop: 10,
      }}>
        Let's find a good event!
      </Text>

      <View style={{
        flexDirection: 'row',
        marginTop: 70,
      }}>
        <Text style={{
          fontSize: 25,
          color: '#FFFFFF',
        }}>
          Popular Events
        </Text>
        <Text style={{
          fontSize: 15,
          color: '#FFFFFF',
          marginLeft: 90,

        }}>
          View More
        </Text>
      </View>

      <View style={{
        flexDirection: 'row',
        marginTop: 70,
      }}>
        <Text style={{
          fontSize: 25,
          color: '#FFFFFF',
        }}>
          Upcoming Events
        </Text>
        <Text style={{
          fontSize: 15,
          color: '#FFFFFF',
          marginLeft: 60,

        }}>
          View More
        </Text>
      </View>
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
})