import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Notifications = () => {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 50,

                }}>
                    <Text style={{
                        fontSize: 30,
                        color: '#FFFFFF',
                        marginTop: 50,
                        marginLeft: 10,
                    }}>
                        Notifications
                    </Text>
                    <Icon style={{
                        marginTop: 56,
                        marginLeft: 10,
                    }} name="notifications" size={30} color="#FFB300" />
                </View>
            </View>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})