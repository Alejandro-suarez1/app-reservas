import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, sombra, radius } from '../theme';

export default function ReservaItem({ reserva, onCancelar }) {

    return (
    <View>
        <Text>
            {reserva.titulo} - {reserva.nivel} - {reserva.profesor} - {reserva.horario}
        </Text>
        <Pressable onPress={() => onCancelar(reserva.id)}>
          <Text>Cancelar</Text>
        </Pressable>
    </View>
    );
}