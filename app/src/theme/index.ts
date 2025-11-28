// Theme configuration for the "Real or AI?" app
// Neon purple and green on dark theme
import fonts from './fonts';

export const colors = {
  // Neon purple palette
  neonPurple: {
    100: '#f5f0ff',
    200: '#e9d9ff',
    300: '#d3b3ff',
    400: '#b980ff',
    500: '#9d4eff',
    600: '#8a20ff',
    700: '#7700e6',
    800: '#5c00b3',
    900: '#3d0080',
  },
  // Neon green palette
  neonGreen: {
    100: '#f0fff4',
    200: '#dcffe6',
    300: '#b3ffcc',
    400: '#80ffaa',
    500: '#4dff88',
    600: '#20ff66',
    700: '#00e64d',
    800: '#00b33c',
    900: '#008029',
  },
  // Dark background colors
  dark: {
    100: '#3a3a3a',
    200: '#303030',
    300: '#282828',
    400: '#202020',
    500: '#181818',
    600: '#121212',
    700: '#0a0a0a',
    800: '#050505',
    900: '#000000',
  }
};

// Typography
export const typography = {
  fontFamily: {
    sans: 'System',
    mono: 'Menlo',
    courier: 'Courier',
    pixel: 'Press Start 2P',
    rajdhani: 'Rajdhani',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
};

// Spacing
export const spacing = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
  32: 128,
};

// Border radius
export const borderRadius = {
  none: 0,
  sm: 2,
  md: 4,
  lg: 8,
  xl: 12,
  '2xl': 16,
  '3xl': 24,
  full: 9999,
};

// Shadows
export const shadows = {
  sm: {
    shadowColor: colors.dark[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  md: {
    shadowColor: colors.dark[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.dark[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  neonPurple: {
    shadowColor: colors.neonPurple[600],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  neonGreen: {
    shadowColor: colors.neonGreen[600],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
};

// Theme object that combines all theme elements
const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  fonts,
};

export default theme;
