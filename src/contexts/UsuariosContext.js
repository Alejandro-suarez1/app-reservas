import React, { createContext, useState } from 'react';

export const UsuariosContext = createContext();
const UsuariosProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);

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