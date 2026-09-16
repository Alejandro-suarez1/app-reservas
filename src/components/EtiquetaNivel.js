import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, colors } from '../theme';

export default function EtiquetaNivel({ nivel }) {
  return (
    <View style={styles.contenedor}>
      <Text style={styles.texto}>{nivel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: spacing.md,
    borderRadius: 999,
    backgroundColor: colors.primarioSuave,
  },
  texto: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
    color: colors.primario,
  },
});