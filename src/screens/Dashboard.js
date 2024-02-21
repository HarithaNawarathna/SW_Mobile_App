import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

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

      <Image
        source={require('../../assets/img/userprofile.png')}
        style={{
          width: 40,
          height: 40,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: '#F6BD0F',
          marginLeft: 100,   
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