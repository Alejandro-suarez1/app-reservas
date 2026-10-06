import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_USUARIO = '@usuario';

export const UsuariosContext = createContext();

const UsuariosProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarUsuario = async () => {
            try {
                const usuarioGuardado = await AsyncStorage.getItem(CLAVE_USUARIO);
                if (usuarioGuardado !== null) {
                    setUsuario(JSON.parse(usuarioGuardado));
                }
            } catch (error) {
                console.error('Error al cargar el usuario:', error);
            } finally {
                setCargando(false);
            }
        };

        cargarUsuario();
    }, []);

    useEffect(() => {
        if (cargando) return;
        if (usuario === null) {
            AsyncStorage.removeItem(CLAVE_USUARIO).catch((error) => {
                console.error('Error al eliminar el usuario:', error);
            });
            return;
        }
        AsyncStorage.setItem(CLAVE_USUARIO, JSON.stringify(usuario)).catch((error) => {
            console.error('Error al guardar el usuario:', error);
        });
    }, [usuario, cargando]);

    const registrarUsuario = (nombre, email, telefono) => {
        const nuevoUsuario = {
            nombre,
            email,
            telefono,
        };
        setUsuario(nuevoUsuario);
    };

    const actualizarUsuario = (email, telefono) => {
        setUsuario((prevUsuario) => {
            if (prevUsuario === null) {
                return prevUsuario;
            }
            return {
                ...prevUsuario,
                email,
                telefono,
            };
        });
    };

    const valor = {
        usuario,
        cargando,
        registrarUsuario,
        actualizarUsuario,
    };

    return (
        <UsuariosContext.Provider value={valor}>
            {children}
        </UsuariosContext.Provider>
    );
};
    
export { UsuariosProvider };