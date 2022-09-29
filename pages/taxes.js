import { useEffect, useState } from 'react'
import { Text, StyleSheet, Share, Button, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Taxes = ({ route, navigation }) => {

  const [taxes, setTaxes] = useState([])
  let active = route.params.active === 'Actives' ? true : false
  let taxesFiltered = taxes?.filter(item => item.active === active)

  const getTaxes = async () => {
    try {
      let response = await fetch('http://localhost:3000/taxes')
      let data = await response.json()
      setTaxes(data)
    } catch (err) {
      console.log(err)
    }
  };

  const onShare = async () => {
    try {
      let result = await Share.share({
        message: 'TaxDown test app'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDetail = (id) => {
    navigation.navigate('TaxDetail', { id: id })
  }

  useEffect(() => {
    getTaxes();
  }, [])

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      {
        taxesFiltered.map(item => (
          <TouchableOpacity onPress={() => handleDetail(item.id)} key={item.id} style={{ ...styles.container, backgroundColor: item.active ? '#3fe27f' : 'grey', opacity: !item.active ? 0.5 : 1 }}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.year}>{item.year}</Text>
          </TouchableOpacity>
        ))
      }
      <Button title='Share App' onPress={onShare} styles={styles.button} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    width: '80%',
    height: 80,
    alignSelf: 'center',
    justifyContent: 'space-around',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: 'white'
  },
  year: {
    color: 'white',
    fontSize: 16,
    alignSelf: 'center',
  }
})
