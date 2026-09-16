import { useState, useMemo } from 'react';
import React from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet, TextInput } from 'react-native';
import Card from '../components/Card';
import NivelFiltro from '../components/NivelFiltro';
import EstadoVacio from '../components/EstadoVacio';
import { spacing, colors, typography, radius } from '../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import useResponsive from '../hooks/useResponsive';
import { CLASES, NIVELES } from '../data/clases';

const ClasesScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { columnas, paddingHorizontal } = useResponsive();
  const [nivel, setNivel] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const resultados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLocaleLowerCase();

    return CLASES.filter((clase) => {
      const coincideNivel = nivel === 'Todos' || clase.nivel === nivel;
      const tituloCoincide = clase.titulo.toLowerCase().includes(textoBusqueda);
      const profesorCoincide = clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
      const coincideTextoBusqueda = textoBusqueda === '' || tituloCoincide || profesorCoincide;

      return coincideNivel && coincideTextoBusqueda;
    });
  }, [nivel, busqueda]);

  return (
    <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}> 
      <View style={{ paddingHorizontal: spacing.md }}>
        <Text style={style.titulo}>Aplicación de clases de inglés</Text>

        <View style={style.buscador}>
          <Ionicons name="search" size={18} color={colors.textoSuave} />
          <TextInput
            style={style.input}
            placeholder="Buscar por nivel o profesor"
            value={busqueda}
            onChangeText={setBusqueda}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {busqueda.length > 0 && (
            <Ionicons name="close-circle" size={18} color={colors.textoSuave} onPress={() => setBusqueda('')} />
          )}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={style.filtrosWrap}>
          {NIVELES.map((item) => (
            <NivelFiltro
              key={item}
              etiqueta={item}
              activo={nivel === item}
              onPress={() => setNivel(item)}
            />
          ))}
        </ScrollView>

        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              clase={item}
              onPress={() => navigation.navigate('DetalleClase', { clase: item })}
            />
          )}
          numColumns={columnas}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal,
            flexGrow: 1,
            paddingBottom: spacing.xl,
          }}
          ListEmptyComponent={
            <EstadoVacio
              icono="alert-circle-outline"
              titulo="No hay resultados"
              mensaje="Intenta con otros criterios de búsqueda"
              textoAccion="Limpiar filtros"
              onAction={() => {
                setNivel('Todos');
                setBusqueda('');
              }}
            />
          }
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  titulo: { ...typography.titulo, marginBottom: spacing.sm },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  filtrosWrap: {
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.texto,
    paddingVertical: 0,
  },
});

export default ClasesScreen;