import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ReservasScreen from '../screens/ReservasScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ClasesStack from './ClasesStack';
import { colors } from '../theme/colors'; 

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: colors?.primario || '#007AFF',
                tabBarInactiveTintColor: colors?.textoSuave || '#8E8E93',
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={ClasesStack} 
                options={{
                    headerShown: false, 
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Reservas" 
                component={ReservasScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Perfil" 
                component={PerfilScreen} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}