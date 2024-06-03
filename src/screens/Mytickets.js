import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Mytickets = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
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
    header: {
        marginTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        color: '#FFFFFF',
        marginHorizontal: 70,
    },
})
