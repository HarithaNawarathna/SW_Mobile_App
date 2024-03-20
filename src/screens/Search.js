import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome6'

const Search = () => {
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
          Events
        </Text>
        <Icon style={{
        marginTop: 7,
        marginLeft: 10,
      }} name="calendar-check" size={30} color="#FDD835" />

      </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#401971',
    alignItems: 'center',
  },
})