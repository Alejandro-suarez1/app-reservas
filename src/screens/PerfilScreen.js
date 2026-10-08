import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Image, ScrollView } from 'react-native';
import { UsuariosContext } from '../contexts/UsuariosContext';
import { colors, spacing, radius, typography } from '../theme';

const validarUsuario = (nombre, email, telefono) => {
    const errores = {};

    if (nombre.trim() === '') {
        errores.nombre = 'El nombre es obligatorio';
    }
    if (!email.trim().includes('@')) {
        errores.email = 'El email debe contener un @';
    }
    if (telefono.length !== 10) {
        errores.telefono = 'El teléfono debe tener 10 dígitos';
    }

    return errores;
};

const PerfilScreen = () => {
    const { usuario, cargando, registrarUsuario, actualizarUsuario, cerrarSesion } = useContext(UsuariosContext);

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [foto, setFoto] = useState('');

    const [errores, setErrores] = useState({});

    const [editando, setEditando] = useState(false);
    const [nuevoEmail, setNuevoEmail] = useState('');
    const [nuevoTelefono, setNuevoTelefono] = useState('');

    const manejarRegistro = () => {
        const erroresEncontrados = validarUsuario(nombre, email, telefono);
        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length === 0) {
            registrarUsuario(nombre, email, telefono, foto);
        }
    };

    const iniciarEdicion = () => {
        setErrores({});
        setNuevoEmail(usuario.email);
        setNuevoTelefono(usuario.telefono);
        setEditando(true);
    };

    const cancelarEdicion = () => {
        setErrores({});
        setEditando(false);
    };

    const guardarCambios = () => {
        const erroresEncontrados = validarUsuario(usuario.nombre, nuevoEmail, nuevoTelefono);
        setErrores(erroresEncontrados);

        if (Object.keys(erroresEncontrados).length === 0) {
            actualizarUsuario(nuevoEmail, nuevoTelefono);
            setEditando(false);
        }
    };

    const manejarCerrarSesion = () => {
        setNombre('');
        setEmail('');
        setTelefono('');
        setFoto('');
        setErrores({});
        setEditando(false);
        cerrarSesion();
    };

    if (cargando) {
        return (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contenidoScroll} keyboardShouldPersistTaps="handled">
                <Text>Cargando...</Text>
            </ScrollView>
        );
    }
    
    if (usuario === null) {
        return (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contenidoScroll} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>Registrar Usuario</Text>

                <TextInput value={nombre} onChangeText={setNombre} placeholder="Nombre" autoCapitalize="words" style={styles.input}/> {errores.nombre && <Text style={styles.textoError}>{errores.nombre}</Text>}
                <TextInput value={email} onChangeText={setEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input}/> {errores.email && <Text style={styles.textoError}>{errores.email}</Text>}
                <TextInput value={telefono} onChangeText={setTelefono} placeholder="Teléfono" keyboardType="phone-pad" style={styles.input}/> {errores.telefono && <Text style={styles.textoError}>{errores.telefono}</Text>}
                <TextInput value={foto} onChangeText={setFoto} placeholder="URL de la foto" keyboardType="url" autoCapitalize="none" style={styles.input}/>
                <View style={styles.botones}>
                    <Pressable onPress={manejarRegistro} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                        <Text style={styles.textoBoton}>Registrar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        );
    }
 
    const tieneFoto = usuario.foto && usuario.foto.trim() !== '';

    if (editando) {
        return (
            <ScrollView style={styles.scroll} contentContainerStyle={styles.contenidoScroll} keyboardShouldPersistTaps="handled">
                <Text style={styles.etiqueta}>Nombre</Text>
                <Text style={styles.valor}>{usuario.nombre}</Text>

                <TextInput value={nuevoEmail} onChangeText={setNuevoEmail} placeholder="Email" keyboardType="email-address" autoCapitalize="none" style={styles.input}/> {errores.email && <Text style={styles.textoError}>{errores.email}</Text>}
                <TextInput value={nuevoTelefono} onChangeText={setNuevoTelefono} placeholder="Teléfono" keyboardType="phone-pad" style={styles.input}/> {errores.telefono && <Text style={styles.textoError}>{errores.telefono}</Text>}
                <View style={styles.botones}>
                    <Pressable onPress={guardarCambios} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                        <Text style={styles.textoBoton}>Guardar</Text>
                    </Pressable>
                    <Pressable onPress={cancelarEdicion} style={({ pressed }) => [styles.botonSecundario, pressed && styles.botonPresionado]}>
                        <Text style={styles.textoBotonSecundario}>Cancelar</Text>
                    </Pressable>
                </View>
            </ScrollView>
        );
    }

    return (
        <View style={styles.contenedor}>
            <View style={styles.avatar}>
                {tieneFoto ? (
                    <Image source={{ uri: usuario.foto }} style={styles.avatarImagen}/>
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
            <View style={styles.botones}>
                <Pressable onPress={iniciarEdicion} style={({ pressed }) => [styles.botonPrincipal, pressed && styles.botonPresionado]}>
                    <Text style={styles.textoBoton}>Editar</Text>
                </Pressable>
                <Pressable onPress={manejarCerrarSesion} style={({ pressed }) => [styles.botonSecundario, pressed && styles.botonPresionado]}>
                    <Text style={styles.textoBotonSecundario}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contenedor: {
        flex: 1,
        backgroundColor: colors.fondo,
        padding: spacing.lg,
        alignItems: 'center',
    },

    titulo: {
        ...typography.titulo,
        marginBottom: spacing.lg,
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.borde,
        borderRadius: radius.md,
        backgroundColor: colors.superficie,
        padding: spacing.sm,
        marginBottom: spacing.md,
        color: colors.texto,
    },

    botonPrincipal: {
        width: '100%',
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
        width: '100%',
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
        alignItems: 'center',
    },

    etiqueta: {
        ...typography.etiqueta,
        color: colors.textoSuave,
        marginBottom: spacing.xs,
        textAlign: 'center',
    },

    valor: {
        ...typography.cuerpo,
        color: colors.texto,
        marginBottom: spacing.lg,
        textAlign: 'center',
    },

    botones: {
        width: '100%',
        marginTop: 'auto',
    },

    scroll: {
        flex: 1,
        backgroundColor: colors.fondo,
    },

    contenidoScroll: {
        padding: spacing.lg,
        alignItems: 'center',
        flexGrow: 1,
    },

    textoError: {
        width: '100%',
        color: colors.error,
        fontSize: 12,
        marginTop: -spacing.sm,
        marginBottom: spacing.sm,
    },

    avatarImagen: {
        width: '100%',
        height: '100%',
    },
});

export default PerfilScreen;