import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useResponsive from '../hooks/useResponsive';
import useReserva from '../hooks/useReserva';
import { colors, spacing, sombra, typography, radius } from '../theme';

export default function DetalleClaseScreen({ route, navigation }) {
  const { clase } = route.params;
  const { isTable } = useResponsive();
  const insets = useSafeAreaInsets();
  const { agregarReserva, reservas } = useReserva();

  const cuposDisponibles =
    clase.cupos - reservas.filter((r) => r.claseId === clase.id).length;

  const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: clase.titulo,
      headerStyle: {
        height: 60 + insets.top,
        backgroundColor: colors.superficie,
      },
      headerTitleStyle: {
        marginTop: insets.top / 2,
      },
      headerLeftContainerStyle: {
        marginTop: insets.top / 2,
      },
    });
  }, [navigation, clase.titulo, insets.top]);

  const handleReservar = () => {
    if (!horarioSeleccionado) {
      Alert.alert('Horario requerido', 'Por favor selecciona un horario para tu clase.');
      return;
    }

    if (cuposDisponibles <= 0) {
      Alert.alert('Sin cupos', 'No quedan cupos disponibles para esta clase.');
      return;
    }

    const resultado = agregarReserva(clase, horarioSeleccionado);

    if (!resultado.ok) {
      Alert.alert('Reserva no realizada', resultado.mensaje);
      return;
    }

    Alert.alert('¡Éxito!', `Reserva confirmada para el horario ${horarioSeleccionado}.`);
  };

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
              <Text style={styles.datoValor}>{cuposDisponibles}</Text>
            </View>
            <View style={styles.dato}>
              <Text style={styles.datoLabel}>Modalidad</Text>
              <Text style={styles.datoValor}>{clase.modalidad}</Text>
            </View>
          </View>

          <Text style={styles.seccionHorarios}>Selecciona un horario:</Text>
          <View style={styles.horariosContainer}>
            {clase.horarios?.map((horario) => {
              const esSeleccionado = horarioSeleccionado === horario;
              return (
                <Pressable
                  key={horario}
                  style={[
                    styles.chipHorario,
                    esSeleccionado && styles.chipHorarioSeleccionado,
                  ]}
                  onPress={() => setHorarioSeleccionado(horario)}
                >
                  <Text
                    style={[
                      styles.textoHorario,
                      esSeleccionado && styles.textoHorarioSeleccionado,
                    ]}
                  >
                    {horario}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.precio}>$ {clase.precio}</Text>
        </View>
      </ScrollView>

      <View style={[styles.barra, { paddingBottom: insets.bottom + spacing.md, paddingTop: spacing.md }]}>
        <Text style={styles.precioBarra}>$ {clase.precio}</Text>
        <Pressable
          style={[styles.botonReserva, cuposDisponibles <= 0 && styles.botonReservaDisabled]}
          onPress={handleReservar}
          disabled={cuposDisponibles <= 0}
        >
          <Text style={styles.textoBoton}>{cuposDisponibles <= 0 ? 'Sin cupos' : 'Reservar curso'}</Text>
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

  seccionHorarios: { marginTop: spacing.lg, fontSize: 15, fontWeight: '700', color: colors.texto },
  horariosContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  chipHorario: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.superficie,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  chipHorarioSeleccionado: {
    backgroundColor: colors.primario,
    borderColor: colors.primario,
  },
  textoHorario: { fontSize: 13, color: colors.texto, fontWeight: '600' },
  textoHorarioSeleccionado: { color: '#FFFFFF' },

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
  botonReservaDisabled: {
    backgroundColor: '#B0B0B0',
  },
  textoBoton: { color: '#FFFFFF', fontWeight: '700' },
});