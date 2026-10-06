import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { UsuariosContext } from '../contexts/UsuariosContext';

const PerfilScreen = () => {
    const { usuario, cargando, registrarUsuario, actualizarUsuario } = useContext(UsuariosContext);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] =useState('');

    const [editando, setEditando] = useState(false);
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [nuevoTelefono, setNuevoTelefono] = useState('');

    const manejarRegistro = () => {
        registrarUsuario(nombre, email, telefono, foto);
    };

    const iniciarEdicion = () => {
        setNuevoEmail(usuario.email);
        setNuevoTelefono(usuario.telefono);
        setEditando(true);
    };

    const guardarCambios = () => {
        actualizarUsuario(nuevoEmail, nuevoTelefono);
        setEditando(false);
    };

    if (cargando) {
        return (
            <View>
                <Text>Cargando...</Text>
            </View>
        );
    }
    
    if (usuario === null) {
        return (
            <View>
                <Text>Registrar Usuario</Text>

                <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" autoCapitalize="words"/>
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
                <TextInput value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad"/>
                <TextInput value={foto} onChangeText={setFoto} placeholder="URL de la foto" keyboardType="url" autoCapitalize="none"/>
                <Pressable onPress={manejarRegistro}>
                    <Text>Registrar</Text>
                </Pressable>
            </View>
        );
    }

    const tieneFoto = usuario.foto && usuario.foto.trim() !== '';

    if (editando) {
        return (
            <View>
                <Text>Nombre: {usuario.nombre}</Text>

                <TextInput value={nuevoEmail} onChangeText={setNuevoEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
                <TextInput value={nuevoTelefono} onChangeText={setNuevoTelefono} placeholder="Teléfono" keyboardType="phone-pad"/>
                <Pressable onPress={guardarCambios}>
                    <Text>Guardar</Text>
                </Pressable>

                <Pressable onPress={() => setEditando(false)}>
                    <Text>Cancelar</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View>
            <View style={{ width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#8aeaffbc' }}>
                {tieneFoto ? (
                    <Image source={{ uri: usuario.foto }} style={{ width: 100, height: 100, borderRadius: 50 }}/>
                ) : (<Text>{usuario.nombre.charAt(0).toUpperCase()}</Text>)}
            </View>
            <Text>Usuario: {usuario.nombre}</Text>
            <Text>Email: {usuario.email}</Text>
            <Text>Teléfono: {usuario.telefono}</Text>
            <Pressable onPress={iniciarEdicion}>
                <Text>Editar</Text>
            </Pressable>
        </View>
    );
};

export default PerfilScreen;