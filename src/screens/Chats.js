import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ChatItem = ({ name, date, image }) => {
    const navigation = useNavigation();
    const formattedDate = new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

    function navigateToEventChat() {
        navigation.navigate('Eventchat');
    }

    return (
        <TouchableOpacity onPress={navigateToEventChat} style={styles.touchable}>
            <View style={styles.chatItem}>
                <Image source={image} style={styles.chatImage} />
                <View style={styles.chatContent}>
                    <Text style={styles.chatName}>{name}</Text>
                    <Text style={styles.chatDate}>{formattedDate}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const Chats = () => {
    const chatData = [
        {
            name: "John Doe",
            date: "2024-06-14",
            image: require('../../assets/img/festive.jpg') // Replace with actual image source
        },
        {
            name: "Jane Smith",
            date: "2024-07-21",
            image: require('../../assets/img/festive.jpg') // Replace with actual image source
        },
        {
            name: "Jane Smith",
            date: "2024-07-21",
            image: require('../../assets/img/festive.jpg') // Replace with actual image source
        },
        {
            name: "Jane Smith",
            date: "2024-07-21",
            image: require('../../assets/img/festive.jpg') // Replace with actual image source
        },
        
    ];

    return (
        <View style={styles.container}>
            <View style={styles.chatHeader}>
                <Text style={styles.chatHeaderText}>Chats</Text>
                <Icon style={styles.chatIcon} name="chat" size={35} color="#FFB300" />
            </View>
            <ScrollView contentContainerStyle={styles.chatContainer}>
                {chatData.map((chat, index) => (
                    <ChatItem
                        key={index}
                        name={chat.name}
                        date={chat.date}
                        image={chat.image}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default Chats;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#401971',
    },
    chatContainer: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    chatHeader: {
        flexDirection: 'row',
        marginTop: 20,
        alignSelf: 'center'
    },
    chatHeaderText: {
        fontSize: 30,
        color: '#FFFFFF',
        marginTop: 30,
        marginLeft: 10,
        marginBottom: 30,
    },
    chatIcon: {
        marginTop: 32,
        marginLeft: 5,
    },
    touchable: {
        width: '100%',
    },
    chatItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 2,
        borderBottomStartRadius: 30,
        borderBottomEndRadius: 30,
        borderBottomColor: '#FFFFFF',
        width: '100%',
    },
    chatImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    chatContent: {
        flex: 1,
    },
    chatName: {
        fontSize: 20,
        color: '#FFFFFF',
    },
    chatDate: {
        fontSize: 16,
        color: '#FFFFFF',
    },
});
