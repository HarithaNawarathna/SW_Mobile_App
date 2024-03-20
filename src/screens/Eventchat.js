import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Eventchat = () => {
    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 50,
                flexDirection: 'row',
            }}>
                <Icon style={{
                }} name="chevron-back-circle" size={40} color="#FFB300" />
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    marginHorizontal: 60,
                }}>
                    Event Details
                </Text>
            </View>
        </View>
    )
}

export default Eventchat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})