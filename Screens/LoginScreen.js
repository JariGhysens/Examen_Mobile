import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate(); // Verander dit naar je startscherm
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async () => {
    const auth = getAuth();
    try {
      await signInAnonymously(auth);
      navigation.navigate();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button color="orange" title="Login" onPress={handleLogin} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="orange" title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button color="orange" title="Login Anonymously" onPress={handleAnonymousLogin} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  error: {
    color: 'red',
    marginBottom: 12,
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

export default LoginScreen;
