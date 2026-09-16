import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing } from '../theme';

export function EstadoVacio({
  icono = 'alert-circle-outline',
  titulo = 'No hay resultados',
  mensaje = 'Intenta con otros criterios de búsqueda',
  textoAccion,
  onAction,
}) {
  return (
    <View style={styles.contenedor}>
      <View style={styles.circulo}>
        <Ionicons name={icono} size={30} color={colors.primario} />
      </View>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.mensaje}>{mensaje}</Text>

      {textoAccion && onAction && (
        <Pressable onPress={onAction} style={styles.boton}>
          <Text style={styles.textoBoton}>{textoAccion}</Text>
        </Pressable>
      )}
    </View>
  );
}

export default EstadoVacio;

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  circulo: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.primarioSuave,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  titulo: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.texto,
    textAlign: 'center',
  },
  mensaje: {
    fontSize: 14,
    color: colors.textoSuave,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  boton: {
    marginTop: spacing.lg,
    backgroundColor: colors.primario,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

