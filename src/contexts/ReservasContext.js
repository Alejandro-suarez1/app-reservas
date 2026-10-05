import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVA = '@reservas_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargar = async () => {
            try {
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVA);
                if (guardado !== null) {
                    setReservas(JSON.parse(guardado));
                }
            } catch (error) {
                console.log('Error leyendo reservas', error);
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []); 

    useEffect(() => {
        if (cargando) return;
        AsyncStorage.setItem(CLAVE_RESERVA, JSON.stringify(reservas)).catch((error) => {
            console.log('Ocurrió un error guardando la reserva', error);
        });
    }, [reservas, cargando]);

    const agregarReserva = useCallback((clase, horario) => {
        const nueva = {
            id: clase.id + '_' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,    
            precio: clase.precio,
            horario: horario,
            creadaEn: new Date().toISOString(),
        };
        let resultados = { ok: true };
        setReservas((prevReservas) => {
            if (prevReservas.some((r) => r.id === nueva.id)) {
                resultados = { ok: false, mensaje: 'Data duplicada' };
                return prevReservas;
            }
            return [nueva, ...prevReservas];
        });
        return resultados;
    }, []);

    const cancelarReserva = useCallback((id) => {
        setReservas((prevReservas) => prevReservas.filter((reserva) => reserva.id !== id));
    }, []);

    const valor = useMemo(() => ({
        reservas,
        cargando,
        agregarReserva,
        cancelarReserva,
    }), [reservas, cargando, agregarReserva, cancelarReserva]);

    return (
        <ReservaContext.Provider value={valor}>
            {children}
        </ReservaContext.Provider>
    );
}