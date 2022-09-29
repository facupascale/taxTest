import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TaxStack } from './taxStack'

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarIconStyle: { display: "none" } }}>
      <Tab.Screen name='Actives' component={TaxStack} />
      <Tab.Screen name='Inactives' component={TaxStack} />
    </Tab.Navigator>
  )
}
