import { StyleSheet, Text, View, FlatList, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';

const events = [
  {
    id: '1',
    name: 'Concert',
    date: '2024-07-15',
    time: '19:00',
  },
  {
    id: '2',
    name: 'Theater',
    date: '2024-07-20',
    time: '18:00',
  },
  {
    id: '3',
    name: 'Sports Event',
    date: '2024-08-01',
    time: '20:00',
  },
  {
    id: '4',
    name: 'Food Festival',
    date: '2024-09-02',
    time: '22:00',
  },
];

const Mytickets = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedQRCode, setSelectedQRCode] = useState(null);

  const renderTicket = ({ item }) => (
    <View style={styles.ticket}>
      <Text style={styles.eventName}>{item.name}</Text>
      <Text style={styles.eventDetails}>{item.date}</Text>
      <Text style={styles.eventDetails}>{item.time}</Text>
      <TouchableOpacity
        onPress={() => {
          setSelectedQRCode(`${item.name}-${item.date}-${item.time}`);
          setModalVisible(true);
        }}
      >
        <QRCode
          value={`${item.name}-${item.date}-${item.time}`}
          size={150}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tickets</Text>
      </View>
      <FlatList
        data={events}
        renderItem={renderTicket}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            {selectedQRCode && (
              <QRCode
                value={selectedQRCode}
                size={300}
              />
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Mytickets;

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
  listContainer: {
    paddingVertical: 20,
  },
  ticket: {
    backgroundColor: '#C7ADCE',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: 300,
  },
  eventName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventDetails: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#401971',
    borderRadius: 5,
    marginBottom: 5,
  },
});
