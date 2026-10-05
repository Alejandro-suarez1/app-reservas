import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClasesScreen from '../screens/ClasesScreen';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Inicio" component={ClasesScreen} />
            <Tab.Screen name="Reservas" component={ReservasScreen} />
            <Tab.Screen name="Perfil" component={PerfilScreen} />
        </Tab.Navigator>
    );
};