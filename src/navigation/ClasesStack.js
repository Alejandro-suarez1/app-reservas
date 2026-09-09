import react from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreen from "../screens/ClasesScreen";
import { colors } from "../theme";
import {DetalleClaseScreen} from "../screens/DetalleClase";

const Stack = createNativeStackNavigator();

export default function ClasesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ClasesScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DetalleClase"
                component={DetalleClaseScreen}
                options={{title: 'Detalle', headerStyle: {backgroundColor: colors.primary}, headerTintColor: colors.white}}
            />
        </Stack.Navigator>
    )
}