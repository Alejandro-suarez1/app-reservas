import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { UsuariosContext } from '../contexts/UsuariosContext';
import { colors, spacing, radius, typography } from '../theme';

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
            <View style={styles.contenedor}>
                <Text>Cargando...</Text>
            </View>
        );
    }
    
    if (usuario === null) {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.titulo}>Registrar Usuario</Text>

                <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" autoCapitalize="words" style={styles.input}/>
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input}/>
                <TextInput value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" style={styles.input}/>
                <TextInput value={foto} onChangeText={setFoto} placeholder="URL de la foto" keyboardType="url" autoCapitalize="none" style={styles.input}/>
                <Pressable onPress={manejarRegistro} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                    <Text style={styles.textoBoton}>Registrar</Text>
                </Pressable>
            </View>
        );
    }
 
    const tieneFoto = usuario.foto && usuario.foto.trim() !== '';

    if (editando) {
        return (
            <View style={styles.contenedor}>
                <Text style={styles.etiqueta}>Nombre</Text>
                <Text style={styles.valor}>{usuario.nombre}</Text>

                <TextInput value={nuevoEmail} onChangeText={setNuevoEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input}/>
                <TextInput value={nuevoTelefono} onChangeText={setNuevoTelefono} placeholder="Teléfono" keyboardType="phone-pad" style={styles.input}/>
                <Pressable onPress={guardarCambios} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                    <Text style={styles.textoBoton}>Guardar</Text>
                </Pressable>

                <Pressable onPress={() => setEditando(false)} style={({ pressed }) => [styles.botonSecundario, pressed && styles.botonPresionado]}>
                    <Text style={styles.textoBotonSecundario}>Cancelar</Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.contenedor}>
            <View style={styles.avatar}>
                {tieneFoto ? (
                    <Image source={{ uri: usuario.foto }} style={styles.avatar}/>
                ) : (<Text style={styles.avatarInicial}>{usuario.nombre.charAt(0).toUpperCase()}</Text>)}
            </View>
            <View style={styles.datosUsuario}>
                <Text style={styles.etiqueta}>Usuario:</Text>
                <Text style={styles.valor}>{usuario.nombre}</Text>
                <Text style={styles.etiqueta}>Email:</Text>
                <Text style={styles.valor}>{usuario.email}</Text>
                <Text style={styles.etiqueta}>Teléfono:</Text>
                <Text style={styles.valor}>{usuario.telefono}</Text>
            </View>
            <Pressable onPress={iniciarEdicion} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                <Text style={styles.textoBoton}>Editar</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colors.fondo,
        padding: spacing.lg,
    },

    titulo: {
        ...typography.titulo,
        marginBottom: spacing.lg,
    },

    input: {
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.md,
        backgroundColor: colors.superficie,
        padding: spacing.sm,
        marginBottom: spacing.md,
        color: colors.texto,
    },

    botonPrincipal: {
    backgroundColor: colors.primario,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    },

    botonPresionado: {
        opacity: 0.7,
    },

    textoBoton: {
        ...typography.cuerpoBold,
        color: colors.superficie,
    },

    botonSecundario: {
    borderWidth: 1,
    borderColor: colors.borde,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
    backgroundColor: colors.superficie,
    },

    textoBotonSecundario: {
        ...typography.cuerpoBold,
        color: colors.texto,
    },

    avatar: {
    width: 100,
    height: 100,
    borderRadius: radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarioSuave,
    overflow: 'hidden',
    },

    avatarInicial: {
        fontSize: 36,
        fontWeight: '800',
        color: colors.primario,
    },

    datosUsuario: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    },

    etiqueta: {
        ...typography.etiqueta,
        color: colors.textoSuave,
        marginBottom: spacing.xs,
    },

    valor: {
        ...typography.cuerpo,
        color: colors.texto,
        marginBottom: spacing.lg,
    },
});

export default PerfilScreen;