import { useState, useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login } from '../pages/login'
import { HomeNavigation } from './tabNavigator'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {

  const [initialRoute, setInitialRoute] = useState('')
  const [initialized, setInitialized] = useState(false)

  const readData = async () => {
    try {
      const result = await AsyncStorage.getItem('credentials');
      let credentials = JSON.parse(result);
      if (credentials?.email && credentials?.password) {
        setInitialRoute('Home')
        setInitialized(true)
      } else {
        setInitialRoute('Login')
        setInitialized(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    readData()
  }, [])

  return (
    <>
      {!initialized
        ? <ActivityIndicator size='large' color='#3FE27F' />
        :
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialRoute} >
            <Stack.Screen name='Login' component={Login} options={{
              headerShown: false
            }} />
            <Stack.Screen name='Home' component={HomeNavigation} options={{
              headerShown: false
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      }
    </>
  )
}
