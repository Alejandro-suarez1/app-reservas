import {} from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import {spacing, colors, typography} from '../theme';
import {} from '../data/clases'

export default function Card({ clase, onPress }) {
    return (
        <Pressable onPress={onPress}>
            <Image source={{ uri: clase.imagen }}/>
            <View>
                <Text style={styles.titulo}>{clase.titulo}</Text>
                <EtiquetaNivel nivel={clase.nivel} />
                <Text style={styles.descripcion}>{clase.descripcion}</Text>
            </View>
        </Pressable>
    );
}