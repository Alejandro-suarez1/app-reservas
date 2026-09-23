import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVA = '@reservas_ingles';

export const ReservaContext = createContext(null);

export function ReservaProvider({ children }) {
    const [reservas, setReservas] = useState([]);
    const [cargando, setCargando] = useState(true);

    // cargar las reservas que tengo guardadas, sino tengo nada, devolver un array vacio
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
        if(cargando) return;
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
        let resultados = { ok: true};
        setReservas((prevReservas) => {
            if (previa.some((r) => r.id === nueva.id)) {
                resultados = {ok: false, mensaje: 'Data duplicada'}
                return previa;
            }
            return [nueva, ...previa];
        });
        return resultados;
    }, []);//cierra el callback

    const valor = useMemo(() => ({
        reservas,
        cargando,
        agregarReserva,
    }), [reservas, cargando, agregarReserva]);

    return (
        <ReservaContext.Provider value={valor}>
            {children}
        </ReservaContext.Provider>
    );

} // llave que cierra la funcion 

  