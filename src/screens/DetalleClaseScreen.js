import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useResponsive from '../hooks/useResponsive';
import { colors, spacing, sombra, typography, radius } from '../theme';

export default function DetalleClaseScreen({ route, navigation }) {
  const { clase } = route.params;
  const { isTable } = useResponsive();
  const insets = useSafeAreaInsets();

  useLayoutEffect(() => {
    navigation.setOptions({ title: clase.titulo });
  }, [navigation, clase.titulo]);

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 + insets.bottom }} showsVerticalScrollIndicator={false}>
        <Image
          source={{ uri: clase.imagen }}
          style={[styles.portada, { height: isTable ? 300 : 200 }]}
          resizeMode="cover"
        />

        <View style={styles.contenido}>
          <View style={[styles.profesor, sombra.sombra]}>
            <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
            <View>
              <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
              <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
            </View>
          </View>

          <Text style={styles.descripcion}>{clase.descripcion}</Text>

          <View style={styles.datos}>
            <View style={styles.dato}>
              <Text style={styles.datoLabel}>Duración</Text>
              <Text style={styles.datoValor}>{clase.duracion} min</Text>
            </View>
            <View style={styles.dato}>
              <Text style={styles.datoLabel}>Cupos</Text>
              <Text style={styles.datoValor}>{clase.cupos}</Text>
            </View>
            <View style={styles.dato}>
              <Text style={styles.datoLabel}>Modalidad</Text>
              <Text style={styles.datoValor}>{clase.modalidad}</Text>
            </View>
          </View>

          <Text style={styles.horarios}>Horarios: {clase.horarios.join(', ')}</Text>
          <Text style={styles.precio}>$ {clase.precio}</Text>
        </View>
      </ScrollView>

      <View style={[styles.barra, { paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.md }]}>
        <Text style={styles.precioBarra}>$ {clase.precio}</Text>
        <Pressable style={styles.botonReserva} onPress={() => Alert.alert('Reserva', '¿Desea realizar la reserva?')}>
          <Text style={styles.textoBoton}>Reservar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  contenido: { padding: spacing.lg },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    marginTop: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoLabel: { fontSize: 12, color: colors.textoSuave },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  profesorPais: { fontSize: 12, color: colors.textoSuave },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.md },
  horarios: { marginTop: spacing.md, color: colors.texto, fontWeight: '600' },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  precio: { marginTop: spacing.md, fontSize: 18, fontWeight: '800', color: colors.primario },
  precioBarra: { fontSize: 18, fontWeight: '800', color: colors.primario },
  botonReserva: {
    backgroundColor: colors.primario,
    borderRadius: radius.full,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  textoBoton: { color: '#FFFFFF', fontWeight: '700' },
});