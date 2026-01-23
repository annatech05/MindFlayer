import { useMood } from '../context/MoodContext';

// Custom hook to get mood-aware styles for components
const useMoodStyles = () => {
    const { currentMood, getMoodConfig } = useMood();
    const config = getMoodConfig();

    // Return style objects that can be used with Material-UI sx prop
    return {
        // Background styles
        background: {
            background: `linear-gradient(${config.colors.gradientDirection}, ${config.colors.gradientStart} 0%, ${config.colors.gradientEnd} 100%)`,
            transition: `background var(--mood-transition-speed) var(--mood-ease-curve)`,
        },

        // Text styles
        text: {
            fontFamily: 'var(--mood-font-family)',
            fontWeight: 'var(--mood-font-weight)',
            letterSpacing: 'var(--mood-letter-spacing)',
            lineHeight: 'var(--mood-line-height)',
            color: 'var(--mood-text-primary)',
            transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
        },

        textBold: {
            fontFamily: 'var(--mood-font-family)',
            fontWeight: 'var(--mood-font-weight-bold)',
            letterSpacing: 'var(--mood-letter-spacing)',
            lineHeight: 'var(--mood-line-height)',
            color: 'var(--mood-text-primary)',
            transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
        },

        // Button styles
        button: {
            borderRadius: 'var(--mood-button-radius)',
            transition: 'all var(--mood-hover-duration) var(--mood-ease-curve)',
            '&:hover': {
                transform: 'scale(var(--mood-hover-scale))',
                boxShadow: 'var(--mood-focus-glow)',
            },
        },

        // Input styles
        input: {
            borderRadius: 'var(--mood-button-radius)',
            borderWidth: 'var(--mood-input-border-width)',
            transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
            '&:focus': {
                boxShadow: 'var(--mood-focus-glow)',
            },
        },

        // Question box gradient
        questionBox: {
            background: 'var(--mood-question-box-gradient)',
            borderRadius: 'var(--mood-button-radius)',
            transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
        },

        // Accent color
        accent: {
            color: 'var(--mood-accent)',
            transition: 'color var(--mood-transition-speed) var(--mood-ease-curve)',
        },

        // Glow effect
        glow: {
            boxShadow: 'var(--mood-focus-glow)',
            transition: 'box-shadow var(--mood-transition-speed) var(--mood-ease-curve)',
        },

        // Current mood config (for custom logic)
        config,
        currentMood,
    };
};

export default useMoodStyles;
