import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Chats = () => {
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
                        Chats
                    </Text>
                    <Icon style={{
                        marginTop: 50,
                        marginLeft: 10,
                    }} name="chat" size={35} color="#FFB300" />
                </View>
            </View>
        </View>
    )
}

export default Chats

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})