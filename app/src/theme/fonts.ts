// Font configuration for the "Real or AI?" app

// Font families
export const fontFamily = {
  // System fonts
  system: 'System',
  
  // Monospace fonts
  mono: 'Menlo',
  courier: 'Courier',
  
  // Custom fonts
  pixel: 'Press Start 2P',
  rajdhani: 'Rajdhani',
};

// Font sizes
export const fontSize = {
  // Standard sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  
  // Pixel font sizes for mobile apps
  pixel: {
    xs: 10,
    sm: 12,
    base: 14,
    lg: 16,
    xl: 18,
    '2xl': 22,
    '3xl': 26,
  }
};

// Font weights
export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
};

// Line heights
export const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
  
  // Specific line heights for pixel font
  pixel: {
    normal: 1.8,
    relaxed: 2,
  }
};

// Letter spacing
export const letterSpacing = {
  tighter: -0.8,
  tight: -0.4,
  normal: 0,
  wide: 0.4,
  wider: 0.8,
  widest: 1.6,
  
  // Specific letter spacing for pixel font
  pixel: {
    normal: 0.5,
    wide: 1,
  }
};

// Font styles for specific screens
export const screenFonts = {
  // Onboarding screens (Splash, Login, Register)
  onboarding: {
    header: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel.xl,
    },
    title: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel['3xl'],
      lineHeight: lineHeight.pixel.normal,
    },
    subtitle: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel.lg,
    },
    button: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel.lg,
    },
    input: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel.base,
    },
    link: {
      fontFamily: fontFamily.pixel,
      fontSize: fontSize.pixel.sm,
    },
  },
  
  // Main app screens
  main: {
    header: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize.xl,
      fontWeight: fontWeight.semibold,
    },
    title: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize['2xl'],
      fontWeight: fontWeight.semibold,
    },
    subtitle: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize.base,
      fontWeight: fontWeight.medium,
    },
    body: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize.base,
      fontWeight: fontWeight.normal,
    },
    button: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize.base,
      fontWeight: fontWeight.semibold,
    },
    tabLabel: {
      fontFamily: fontFamily.rajdhani,
      fontSize: fontSize.xs,
      fontWeight: fontWeight.semibold,
    },
  },
};

// Export all font-related configurations
const fonts = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  screenFonts,
};

export default fonts;
