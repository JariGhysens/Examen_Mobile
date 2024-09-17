import React, { createContext, useState, useEffect } from 'react';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';

const MeetupContext = createContext();

export const MeetupProvider = ({ children }) => {
  const [meetups, setMeetups] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      fetchMeetups();
    });
    return () => unsubscribe();
  }, []);

  const fetchMeetups = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'meetups'));
      const fetchedMeetups = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMeetups(fetchedMeetups);
    } catch (error) {
      console.error('Error fetching meetups:', error);
    }
  };

  const addMeetup = async (meetup) => {
    if (user && user.isAnonymous) {
      console.log('Anonymous users cannot add meetups');
      return;
    }
    try {
      const docRef = await addDoc(collection(db, 'meetups'), meetup);
      setMeetups(currentMeetups => [...currentMeetups, { id: docRef.id, ...meetup }]);
      await fetchMeetups();
    } catch (error) {
      console.error('Error adding meetup:', error);
    }
  };

  const toggleFavorite = async (meetupId) => {
    if (user && user.isAnonymous) {
      console.log('Anonymous users cannot modify meetups');
      return;
    }
    try {
      const meetupDoc = doc(db, 'meetups', meetupId);
      const currentMeetup = meetups.find(m => m.id === meetupId);
      const updatedMeetup = { ...currentMeetup, favorite: !currentMeetup.favorite };
      await updateDoc(meetupDoc, { favorite: updatedMeetup.favorite });
      setMeetups(meetups.map(m => (m.id === meetupId ? updatedMeetup : m)));
    } catch (error) {
      console.error('Error updating favorite status:', error);
    }
  };

  const deleteMeetup = async (meetupId) => {
    if (user && user.isAnonymous) {
      console.log('Anonymous users cannot delete meetups');
      return;
    }
    try {
      await deleteDoc(doc(db, 'meetups', meetupId));
      setMeetups(meetups.filter(m => m.id !== meetupId));
    } catch (error) {
      console.error('Error deleting meetup:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <MeetupContext.Provider value={{ meetups, addMeetup, fetchMeetups, toggleFavorite, deleteMeetup, logout }}>
      {children}
    </MeetupContext.Provider>
  );
};

export default MeetupContext;