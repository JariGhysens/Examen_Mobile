// Screens/NewMeetupScreen.js
import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import MeetupContext from './MeetupContext';

const MeetupSchema = Yup.object().shape({
  title: Yup.string().min(4, 'Too Short!').required('Required'),
  address: Yup.string().min(4, 'Too Short!').required('Required'),
  description: Yup.string().min(8, 'Too Short!').required('Required'),
  capacity: Yup.number().min(50, 'Capacity must be at least 50').required('Required'),
  duration: Yup.string().matches(/^(2[0-4]|[1-9])$/, 'Duration must be between 1 and 24').required('Required'),
});

const NewMeetupScreen = ({ navigation }) => {
  const { addMeetup } = useContext(MeetupContext);

  const handleSubmit = async (values, resetForm) => {
    try {
      const meetup = { ...values, favorite: false }; // Add favorite field with default value
      console.log('Submitting form', meetup);
      await addMeetup(meetup);
      console.log('Meetup added');
      resetForm(); // Reset the form fields
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error adding meetup:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="close" size={24} color="black" />
      </TouchableOpacity>

      <Formik
        initialValues={{ title: '', address: '', description: '', capacity: '', duration: '' }}
        validationSchema={MeetupSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View>
            <TextInput
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              placeholder="Title"
              style={styles.input}
            />
            {touched.title && errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
            <TextInput
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              placeholder="Address"
              style={styles.input}
            />
            {touched.address && errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            <TextInput
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              placeholder="Description"
              style={styles.input}
            />
            {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
            <TextInput
              onChangeText={handleChange('capacity')}
              onBlur={handleBlur('capacity')}
              value={values.capacity}
              placeholder="Capacity"
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.capacity && errors.capacity && <Text style={styles.errorText}>{errors.capacity}</Text>}
            <TextInput
              onChangeText={handleChange('duration')}
              onBlur={handleBlur('duration')}
              value={values.duration}
              placeholder="Duration (hours)"
              keyboardType="numeric"
              style={styles.input}
            />
            {touched.duration && errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}
            <Button mode="contained" onPress={handleSubmit} style={styles.addButton}>
              Add new meetup
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  input: {
    marginBottom: 10,
  },
  addButton: {
    marginTop: 10,
    paddingVertical: 5,
    backgroundColor: 'magenta',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default NewMeetupScreen;
