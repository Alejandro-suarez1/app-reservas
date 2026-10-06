import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, sombra, radius } from '../theme';

export default function ReservaItem({ reserva, onCancelar }) {
  if (!reserva) return null;

  return (
    <View style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.titulo}>{reserva.titulo}</Text>
        <Text style={styles.detalles}>
          {reserva.nivel} • {reserva.profesor} • {reserva.horario}
        </Text>
      </View>
      <Pressable
        style={styles.botonCancelar}
        onPress={() => onCancelar?.(reserva.id)}
      >
        <Text style={styles.textoCancelar}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...sombra.sombra,
  },
  info: { flex: 1, marginRight: spacing.sm },
  titulo: { fontSize: 16, fontWeight: 'bold', color: colors.texto },
  detalles: { fontSize: 14, color: colors.textoSuave, marginTop: spacing.xs },
  botonCancelar: {
    backgroundColor: colors.error || '#EF4444',
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  textoCancelar: { color: '#FFFFFF', fontWeight: '600', fontSize: 12 },
});