import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo, Feather } from '@expo/vector-icons';
import MeetupContext from '../Screens/MeetupContext';

const Card = ({ meetup, onPressInfo }) => {
  const { toggleFavorite, deleteMeetup } = useContext(MeetupContext);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>{meetup.title}</Text>
        <Text>{meetup.address}</Text>
        <Text>Capacity: {meetup.capacity}</Text>
        <Text>Duration: {meetup.duration} hours</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => toggleFavorite(meetup.id)}>
            {meetup.favorite ? (
              <Entypo name="heart" size={24} color="red" />
            ) : (
              <Feather name="heart" size={24} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressInfo} style={styles.infoIcon}>
            <Entypo name="info" size={24} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteMeetup(meetup.id)} style={styles.deleteIcon}>
            <Feather name="trash-2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexBasis: '48%',
    margin: '1%',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  infoIcon: {
    marginLeft: 10,
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default Card;
