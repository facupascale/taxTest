import { useState } from 'react'
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {

  const [textEmail, setTextEmail] = useState('')
  const [textPassword, setTextPassword] = useState('')

  const credentials = {
    email: 'taxdown@hiring.com',
    password: 'hired'
  }

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('credentials', JSON.stringify(credentials))
      console.log('data saved')
    } catch (err) {
      console.log(err)
    }
  }

  const validateAccount = () => {
    if (textEmail !== credentials.email || textPassword !== credentials.password) {
      Alert.alert('Incorrect email or password', 'Please try again with the correct data', [{ text: 'Ok' }])
    } else {
      saveData()
      navigation.navigate('Home')
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <Image style={styles.img} resizeMode='contain' source={require('../assets/logo.png')} />
        <Text style={styles.title}>Login</Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.inputContainer}>
          <Text style={{ ...styles.title, fontSize: 16, marginBottom: 5 }}>Email</Text>
          <TextInput style={styles.input} onChangeText={(e) => setTextEmail(e)} autoCapitalize='none' keyboardType='email-address' maxLength={20} placeholder='enter email' />
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ ...styles.title, fontSize: 16, marginBottom: 5 }}>Password</Text>
          <TextInput style={styles.input} onChangeText={(e) => setTextPassword(e)} autoCapitalize='none' maxLength={8} placeholder='enter password' />
        </View>
        <TouchableOpacity style={styles.button} onPress={validateAccount}>
          <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  header: {
    height: 50,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  img: {
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3FE27F'
  },
  subContainer: {
    width: '100%',
    height: '60%'
  },
  inputContainer: {
    width: '90%',
    height: 100,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'grey',
    marginVertical: 10,
    height: 50,
  },
  button: {
    marginTop: 10,
    borderRadius: 15,
    backgroundColor: '#3FE27F',
    width: '25%',
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  }
})
