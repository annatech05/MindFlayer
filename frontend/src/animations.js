export const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.6, ease: 'easeOut' }
};

export const slideIn = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 30 },
    transition: { duration: 0.5, ease: 'easeOut' }
};

export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

// Line-by-line text reveal for AI judgments
export const lineReveal = (delay = 0) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: 'easeOut' }
});

// Glow pulse effect for AI responses
export const glowPulse = {
    animate: {
        boxShadow: [
            '0 0 20px rgba(157, 78, 221, 0.3)',
            '0 0 40px rgba(157, 78, 221, 0.5)',
            '0 0 20px rgba(157, 78, 221, 0.3)',
        ],
    },
    transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
    }
};

// Background color transition
export const backgroundShift = (color) => ({
    animate: {
        backgroundColor: color,
    },
    transition: {
        duration: 1.5,
        ease: 'easeInOut',
    }
});

// Button hover animation
export const buttonHover = {
    whileHover: {
        scale: 1.05,
        boxShadow: '0 8px 24px rgba(157, 78, 221, 0.4)',
    },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 }
};

// Dramatic entrance for landing screen
export const dramaticEntrance = {
    initial: { opacity: 0, scale: 0.9, y: 30 },
    animate: { opacity: 1, scale: 1, y: 0 },
    transition: { duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }
};
