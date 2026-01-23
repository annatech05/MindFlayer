// Comprehensive mood configurations
// Each mood controls: colors, typography, motion, and components

const moodConfigs = {
    calm: {
        name: 'Calm',
        colors: {
            bgPrimary: '#1A1A2E',
            bgSecondary: '#2A2A3E',
            accent: '#7DBFB0',
            accentLight: '#A8DADC',
            textPrimary: '#FFFFFF',
            textSecondary: '#B8C5D6',
            gradientStart: '#1A1A2E',
            gradientEnd: '#2A2A3E',
            gradientDirection: '90deg', // horizontal
            questionBoxGradient: 'linear-gradient(135deg, #D4E4E7 0%, #C8E0E3 100%)',
            glowColor: 'rgba(125, 191, 176, 0.3)',
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontWeightBold: 400,
            letterSpacing: '0.02em',
            lineHeight: 1.8,
        },
        motion: {
            transitionSpeed: '0.8s',
            easeCurve: 'ease-in-out',
            entranceDelay: 0.3,
            hoverDuration: '0.4s',
        },
        components: {
            buttonRadius: '20px',
            hoverScale: 1.02,
            focusGlow: '0 0 30px rgba(125, 191, 176, 0.4)',
            inputBorderWidth: '2px',
        },
    },

    energetic: {
        name: 'Energetic',
        colors: {
            bgPrimary: '#000000',
            bgSecondary: '#0A0A0A',
            accent: '#C77DFF',
            accentLight: '#E0AAFF',
            textPrimary: '#FFFFFF',
            textSecondary: '#CCCCCC',
            gradientStart: '#000000',
            gradientEnd: '#1A0A2E',
            gradientDirection: '135deg', // diagonal
            questionBoxGradient: 'linear-gradient(135deg, #FF006E 0%, #FFBE0B 100%)',
            glowColor: 'rgba(199, 125, 255, 0.5)',
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            fontWeightBold: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
        },
        motion: {
            transitionSpeed: '0.2s',
            easeCurve: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // bounce
            entranceDelay: 0.1,
            hoverDuration: '0.15s',
        },
        components: {
            buttonRadius: '4px',
            hoverScale: 1.1,
            focusGlow: '0 0 20px rgba(199, 125, 255, 0.8)',
            inputBorderWidth: '3px',
        },
    },

    romantic: {
        name: 'Romantic',
        colors: {
            bgPrimary: '#2A1A2E',
            bgSecondary: '#3A2A3E',
            accent: '#FFB3D9',
            accentLight: '#FFC9E3',
            textPrimary: '#FFF5F8',
            textSecondary: '#E8D4DC',
            gradientStart: '#2A1A2E',
            gradientEnd: '#4A2A4E',
            gradientDirection: 'radial', // radial gradient
            questionBoxGradient: 'linear-gradient(135deg, #FFD6E8 0%, #FFC9E3 100%)',
            glowColor: 'rgba(255, 179, 217, 0.4)',
        },
        typography: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 400,
            fontWeightBold: 600,
            letterSpacing: '0.03em',
            lineHeight: 1.7,
        },
        motion: {
            transitionSpeed: '0.6s',
            easeCurve: 'ease-in-out',
            entranceDelay: 0.4,
            hoverDuration: '0.5s',
        },
        components: {
            buttonRadius: '16px',
            hoverScale: 1.03,
            focusGlow: '0 0 25px rgba(255, 179, 217, 0.5)',
            inputBorderWidth: '2px',
        },
    },

    dark: {
        name: 'Dark',
        colors: {
            bgPrimary: '#000000',
            bgSecondary: '#0A0A0A',
            accent: '#8B0000',
            accentLight: '#A52A2A',
            textPrimary: '#E0E0E0',
            textSecondary: '#808080',
            gradientStart: '#000000',
            gradientEnd: '#0A0A0A',
            gradientDirection: '180deg', // vertical, subtle
            questionBoxGradient: 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)',
            glowColor: 'rgba(139, 0, 0, 0.3)',
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontWeightBold: 600,
            letterSpacing: '0em',
            lineHeight: 1.5,
        },
        motion: {
            transitionSpeed: '0.5s',
            easeCurve: 'ease-out',
            entranceDelay: 0.2,
            hoverDuration: '0.3s',
        },
        components: {
            buttonRadius: '8px',
            hoverScale: 1.0, // no scale, just color
            focusGlow: '0 0 10px rgba(139, 0, 0, 0.5)',
            inputBorderWidth: '1px',
        },
    },

    focused: {
        name: 'Focused',
        colors: {
            bgPrimary: '#1E1E1E',
            bgSecondary: '#2A2A2A',
            accent: '#4CC9F0',
            accentLight: '#72D5F5',
            textPrimary: '#FFFFFF',
            textSecondary: '#A0A0A0',
            gradientStart: '#1E1E1E',
            gradientEnd: '#2E2E2E',
            gradientDirection: '90deg', // horizontal, subtle
            questionBoxGradient: 'linear-gradient(135deg, #B8D4E0 0%, #A8C4D0 100%)',
            glowColor: 'rgba(76, 201, 240, 0.3)',
        },
        typography: {
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontWeightBold: 500,
            letterSpacing: '0em',
            lineHeight: 1.6,
        },
        motion: {
            transitionSpeed: '0.15s',
            easeCurve: 'ease',
            entranceDelay: 0.05,
            hoverDuration: '0.1s',
        },
        components: {
            buttonRadius: '6px',
            hoverScale: 1.0, // no scale
            focusGlow: '0 0 0 2px rgba(76, 201, 240, 0.5)',
            inputBorderWidth: '1px',
        },
    },
};

export default moodConfigs;
