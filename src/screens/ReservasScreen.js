import React, { useContext } from 'react';
import { View, FlatList, ActivityIndicator, Alert, StyleSheet, Text } from 'react-native';
import { ReservaContext } from '../contexts/ReservasContext';
import ReservaItem from '../components/ReservaItem';
import EstadoVacio from '../components/EstadoVacio';

export default function ReservasScreen() {
    const { reservas, cargando, cancelarReserva } = useContext(ReservaContext);

    if (cargando) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    const confirmarCancelar = (id) => {
        Alert.alert(
            'Cancelar reserva',
            '¿Estás seguro de que deseas cancelar esta reserva?',
            [
                {
                    text: 'No',
                    style: 'cancel',
                },
                {
                    text: 'Sí, cancelar',
                    style: 'destructive',
                    onPress: () => cancelarReserva(id),
                },
            ]
        );
    };

    if (reservas.length === 0) {
        return <EstadoVacio mensaje="No tienes reservas agendadas aún." />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={reservas}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ReservaItem 
                        reserva={item} 
                        onCancelar={() => confirmarCancelar(item.id)} 
                    />
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
    },
});