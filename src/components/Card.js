import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { spacing, colors, typography, radius } from '../theme';

export default function Card({ clase, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Image source={{ uri: clase.imagen }} style={styles.imagen} resizeMode="cover" />
      <View style={styles.contenido}>
        <EtiquetaNivel nivel={clase.nivel} />
        <Text style={styles.titulo}>{clase.titulo}</Text>
        <Text style={styles.descripcion}>{clase.descripcion}</Text>
        <Text style={styles.profesor}>{clase.profesor.nombre}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: spacing.md,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  imagen: {
    width: '100%',
    height: 160,
  },
  contenido: {
    padding: spacing.md,
  },
  titulo: {
    ...typography.subtitulo,
    marginTop: spacing.sm,
  },
  descripcion: {
    ...typography.cuerpo,
    color: colors.textoSuave,
    marginTop: spacing.xs,
  },
  profesor: {
    marginTop: spacing.sm,
    fontSize: 12,
    fontWeight: '600',
    color: colors.primario,
  },
});