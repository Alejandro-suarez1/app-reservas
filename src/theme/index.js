export const colors = {
  fondo: '#F2F2F2',
  primario: '#5856D6',
  primarioSuave: '#E9E7FF',
  superficie: '#FFFFFF',
  texto: '#111827',
  textoSuave: '#6B7280',
  borde: '#E5E7EB',
  fondoOscuro: '#F3F4F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};

export const radius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const sombra = {
  sombra: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
};

export const typography = {
  titulo: { fontSize: 26, fontWeight: '800', color: colors.texto },
  subtitulo: { fontSize: 18, fontWeight: '600', color: colors.texto },
  cuerpo: { fontSize: 14, fontWeight: '400', color: colors.texto },
  cuerpoBold: { fontSize: 14, fontWeight: '700', color: colors.texto },
  etiqueta: { fontSize: 11, fontWeight: '700', letterSpacing: 0.3, color: colors.texto },
};

export default { colors, spacing, radius, typography, sombra };