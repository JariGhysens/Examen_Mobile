// Screens/AllMeetupsScreen.js
import React, { useContext } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import Card from '../Components/Card';
import AddMeetupButton from '../Components/AddMeetupButton';
import MeetupContext from './MeetupContext';

const { width } = Dimensions.get('window');

const AllMeetupsScreen = ({ navigation }) => {
  const { meetups } = useContext(MeetupContext);

  const handlePressInfo = (meetupId) => {
    navigation.navigate('MeetupDetails', { meetupId });
  };

  const renderItem = ({ item, index }) => {
    const isLastOddItem = meetups.length % 2 !== 0 && index === meetups.length - 1;
    return (
      <View style={[styles.cardContainer, isLastOddItem && styles.centerLastOddItem]}>
        <Card
          meetup={item}
          onPressInfo={() => handlePressInfo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={meetups}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 }}
        columnWrapperStyle={styles.columnWrapper}
      />
      <View style={styles.floatingButtonContainer}>
        <AddMeetupButton onPress={() => navigation.navigate('NewMeetup')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexBasis: '48%',
    margin: '1%',
  },
  centerLastOddItem: {
    flexBasis: '100%',
    alignItems: 'center',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
});

export default AllMeetupsScreen;
