// AboutScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import MeetupContext from './MeetupContext';

const AboutScreen = () => {
  const { logout } = useContext(MeetupContext);
  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(user, { displayName: name });
      await updateEmail(user, email);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.content}>You are logged in as:</Text>
      <Text style={styles.content}>
        {user?.isAnonymous ? 'Anonymous' : email}
      </Text>
      {!user?.isAnonymous && (
        <>
          <Text style={styles.content}>Update your name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile} disabled={loading}>
            <Text style={styles.updateButtonText}>Update Profile</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    width: '80%',
  },
  updateButton: {
    backgroundColor: '#5cb85c',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default AboutScreen;
