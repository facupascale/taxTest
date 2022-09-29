import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Taxes } from '../pages/taxes'
import { DetailTax } from '../pages/detailTax'

const Stack = createNativeStackNavigator()

export const TaxStack = ({ route }) => {

  return (
    <Stack.Navigator initialRouteName='TaxesList'>
      <Stack.Screen name='TaxesList' component={Taxes} initialParams={{ active: route.name }} />
      <Stack.Screen name='TaxDetail' component={DetailTax} />
    </Stack.Navigator>
  )
}
