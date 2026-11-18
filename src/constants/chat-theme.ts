import { StyleSheet } from 'react-native';

/** Tokens extraídos del UI kit de Figma (WhatsApp UI Clone) y adaptados a la app. */
export const C = {
  product: '#1DAB61',
  productDark: '#15603E',
  productSoft: '#D0FECF',
  textPrimary: '#0A0A0A',
  textSecondary: '#767779',
  textAlpha: 'rgba(0,0,0,0.5)',
  textInvert: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceChip: '#F4F4F4',
  surfaceSearch: 'rgba(10,10,10,0.05)',
  surfaceCircular: 'rgba(10,10,10,0.04)',
  surfacePanel: 'rgba(244,244,244,0.94)',
  surfaceGrouped: '#F4F4F4',
  chatBg: '#F5F2EB',
  chatPanel: 'rgba(245,242,235,0.96)',
  bubbleMe: '#D0FECF',
  bubbleFriend: '#FFFFFF',
  bubbleBorder: 'rgba(0,0,0,0.06)',
  inputBorder: '#B2B2B2',
  separator: 'rgba(0,0,0,0.2)',
  panelBorder: 'rgba(0,0,0,0.3)',
  read: '#007BFC',
  danger: '#E5484D',
};

export const T = StyleSheet.create({
  title: { fontSize: 33, fontWeight: '700', letterSpacing: -1.3, color: C.textPrimary },
  name: { fontSize: 16, fontWeight: '600', letterSpacing: -0.32, color: C.textPrimary },
  body: { fontSize: 14, lineHeight: 19, letterSpacing: -0.14, color: C.textSecondary },
  message: { fontSize: 15.8, lineHeight: 21, letterSpacing: -0.2, color: C.textPrimary },
  time: { fontSize: 11, letterSpacing: 0.55, color: C.textAlpha },
  chip: { fontSize: 14, fontWeight: '600', letterSpacing: -0.14 },
  caption: { fontSize: 12, fontWeight: '600', color: C.textPrimary },
});

/** Paleta para avatares e iniciales de autores (identidad propia, estilo comunidades). */
const AVATAR_COLORS = ['#1DAB61', '#007BFC', '#D42A66', '#F29C1F', '#7E57C2', '#00A3A3', '#E5484D', '#5C6BC0'];

export function colorFor(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
}
