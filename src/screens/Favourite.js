import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

const Favourite = () => {
    return (
        <View style={styles.container}>
            <View style={{
                marginTop: 50,
                flexDirection: 'row',
            }}>
                <Text style={{
                    fontSize: 30,
                    color: '#FFFFFF',
                    
                }}>
                    Favourite List
                </Text>
                <Icon style={{
                    marginLeft: 10,
                }} name="heart" size={40} color="#B71C1C" />
            </View>
        </View>
    )
}

export default Favourite

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
        alignItems: 'center',
    },
})