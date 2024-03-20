import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Fontisto'

const Popularevents = () => {
    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                marginTop: 50,

            }}>
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginTop: 70,
                    marginLeft: 10,
                }}>
                    Popular Events
                </Text>
                <Icon style={{
                    marginTop: 73,
                    marginLeft: 10,
                }}name="fire" size={30} color="#FFB300"  />
            </View>
        </View>
    )
}

export default Popularevents

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})