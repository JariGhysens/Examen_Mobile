// CustomHeader.js
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MeetupContext from '../Screens/MeetupContext';

const CustomHeader = ({ title, navigation }) => {
  const { favoriteCount } = useContext(MeetupContext);

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text style={styles.menuText}>Menu</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.favoriteText}>Favorite Meetups: {favoriteCount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 10,
  },
  menuText: {
    fontSize: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  favoriteText: {
    fontSize: 16,
  },
});

export default CustomHeader;
