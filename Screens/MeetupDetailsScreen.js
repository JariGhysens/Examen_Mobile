// Screens/MeetupDetailsScreen.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MeetupContext from './MeetupContext';

const MeetupDetailsScreen = ({ route }) => {
  const { meetupId } = route.params;
  const { meetups } = useContext(MeetupContext);
  const meetup = meetups.find(m => m.id === meetupId);

  if (!meetup) {
    return (
      <View style={styles.container}>
        <Text>Meetup not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title</Text>
      <Text>{meetup.title}</Text>
      <Text style={styles.title}>Address</Text>
      <Text>{meetup.address}</Text>
      <Text style={styles.title}>Description</Text>
      <Text>{meetup.description}</Text>
      <Text style={styles.title}>Capacity</Text>
      <Text>{meetup.capacity}</Text>
      <Text style={styles.title}>Duration (hours)</Text>
      <Text>{meetup.duration}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'lightblue',
  },
  content: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default MeetupDetailsScreen;
