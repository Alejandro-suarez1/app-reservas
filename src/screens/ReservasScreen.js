import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useReserva from '../hooks/useReserva';
import ReservaItem from '../components/ReservaItem';
import EstadoVacio from '../components/EstadoVacio';
import { colors, spacing } from '../theme';

export default function ReservasScreen({ navigation }) {
  const { reservas, cargando, cancelarReserva } = useReserva();
  const insets = useSafeAreaInsets();

  if (cargando) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color={colors.primario} />
      </View>
    );
  }

  return (
    <View style={styles.pantalla}>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReservaItem reserva={item} onCancelar={cancelarReserva} />
        )}
        contentContainerStyle={[
          styles.lista,
          reservas.length === 0 && styles.listaVacia,
          { paddingBottom: spacing.md + insets.bottom },
        ]}
        ListEmptyComponent={
          <EstadoVacio
            icono="calendar-outline"
            titulo="Aún no tienes reservas"
            mensaje="Reserva una clase desde Inicio y aparecerá aquí."
            textoAccion="Ver clases"
            onAction={() => navigation.navigate('Inicio')}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  lista: { padding: spacing.md },
  listaVacia: { flexGrow: 1, justifyContent: 'center' },
  centrado: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.fondo,
  },
});