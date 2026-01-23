import moodConfigs from '../moods/moodConfigs';

// Update CSS custom properties based on mood configuration
const updateCSSVariables = (moodConfig) => {
    const root = document.documentElement;

    // Colors
    root.style.setProperty('--mood-bg-primary', moodConfig.colors.bgPrimary);
    root.style.setProperty('--mood-bg-secondary', moodConfig.colors.bgSecondary);
    root.style.setProperty('--mood-accent', moodConfig.colors.accent);
    root.style.setProperty('--mood-accent-light', moodConfig.colors.accentLight);
    root.style.setProperty('--mood-text-primary', moodConfig.colors.textPrimary);
    root.style.setProperty('--mood-text-secondary', moodConfig.colors.textSecondary);
    root.style.setProperty('--mood-gradient-start', moodConfig.colors.gradientStart);
    root.style.setProperty('--mood-gradient-end', moodConfig.colors.gradientEnd);
    root.style.setProperty('--mood-gradient-direction', moodConfig.colors.gradientDirection);
    root.style.setProperty('--mood-question-box-gradient', moodConfig.colors.questionBoxGradient);
    root.style.setProperty('--mood-glow-color', moodConfig.colors.glowColor);

    // Typography
    root.style.setProperty('--mood-font-family', moodConfig.typography.fontFamily);
    root.style.setProperty('--mood-font-weight', moodConfig.typography.fontWeight);
    root.style.setProperty('--mood-font-weight-bold', moodConfig.typography.fontWeightBold);
    root.style.setProperty('--mood-letter-spacing', moodConfig.typography.letterSpacing);
    root.style.setProperty('--mood-line-height', moodConfig.typography.lineHeight);

    // Motion
    root.style.setProperty('--mood-transition-speed', moodConfig.motion.transitionSpeed);
    root.style.setProperty('--mood-ease-curve', moodConfig.motion.easeCurve);
    root.style.setProperty('--mood-entrance-delay', `${moodConfig.motion.entranceDelay}s`);
    root.style.setProperty('--mood-hover-duration', moodConfig.motion.hoverDuration);

    // Components
    root.style.setProperty('--mood-button-radius', moodConfig.components.buttonRadius);
    root.style.setProperty('--mood-hover-scale', moodConfig.components.hoverScale);
    root.style.setProperty('--mood-focus-glow', moodConfig.components.focusGlow);
    root.style.setProperty('--mood-input-border-width', moodConfig.components.inputBorderWidth);
};

// Initialize CSS variables with default mood
const initializeCSSVariables = (moodName = 'focused') => {
    const moodConfig = moodConfigs[moodName];
    if (moodConfig) {
        updateCSSVariables(moodConfig);
    }
};

export { updateCSSVariables, initializeCSSVariables };
