import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator, Image, Button } from 'react-native'
import * as ImagePicker from 'react-native-image-picker';

export const DetailTax = ({ route }) => {

  const [inputForm, setInputForm] = useState([])
  const [ready, setReady] = useState(false)
  const [form, setForm] = useState({
    name: '',
    surname: '',
    age: '',
    picture: '',
  })

  const onImageLibraryPress = useCallback(() => {
    let options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      let source = response.assets[0].uri
      if (source) {
        setForm({ ...form, picture: source })
      } else {
        Alert.alert('Error', 'Please try again', [{ text: 'Ok' }])
      }
    });
  }, [])

  const onCameraPress = useCallback(() => {
    let options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, (response) => {
      let source = response?.assets[0]?.uri
      if (source) {
        setForm({ ...form, picture: source })
      } else {
        Alert.alert('Error', 'Please try again', [{ text: 'Ok' }])
      }
    });
  }, [])

  const getTaxes = async () => {
    try {
      let response = await fetch(`http://localhost:3000/taxes/${route.params.id}`)
      let data = await response.json()
      setInputForm(data.inputFields)
      setReady(true)
    } catch (err) {
      console.log(err)
    }
  };

  const handleInfo = async () => {
    try {
      let response = await fetch(`http://localhost:3000/taxes/${route.params.id}`, {

      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTaxes();
  }, [route.params.id])

  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      {!ready
        ? <ActivityIndicator size={'large'} color='#3fe27f' />
        : inputForm?.map(item => (
          <View key={item.id} style={styles.inputContainer}>
            <Text style={styles.label}>{item.label}</Text>
            {item.type === 'picture'
              ?
              <View style={styles.imageContainer}>
                <Image resizeMode='contain' style={styles.img} source={{ uri: form.picture ? form.picture : null }} />
                <Button title='Upload Picture from library' styles={styles.button} onPress={onImageLibraryPress} />
                <Button title='Upload Picture from Camera' styles={styles.button} onPress={onCameraPress} />
              </View>
              :
              <TextInput
                style={styles.input}
                placeholder={item.placeholder}
                maxLength={item.maxLength}
                keyboardType={item.type === 'text' ? 'default' : 'numeric'}
                onChangeText={(e) => setForm({ ...form, [item.id]: e })}
              />
            }
          </View>
        ))
      }
      <Button title='Submit Info' onPress={handleInfo} style={styles.submitButton} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    justifyContent: 'space-around',
  },
  inputContainer: {
    alignSelf: 'center',
    width: '90%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingLeft: 5,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    justifyContent: 'space-around',
    backgroundColor: '#3fe27f',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  img: {
    width: '100%',
    height: 150,
  },
  submitButton: {
    alignSelf: 'flex-start'
  }
})
