import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Mytickets = () => {
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
                    marginHorizontal: 70,
                }}>
                    My Tickets
                </Text>
                
            </View>
        </View>
    )
}

export default Mytickets

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})