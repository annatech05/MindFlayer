import { motion } from 'framer-motion';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMood } from '../context/MoodContext';
import { fadeIn } from '../animations';

// Mood icons (using emoji for simplicity, can be replaced with actual icons)
const moodIcons = {
    calm: '🌊',
    energetic: '⚡',
    romantic: '💗',
    dark: '🌑',
    focused: '🎯',
};

const moodDescriptions = {
    calm: 'Calm & Peaceful',
    energetic: 'Bold & Energetic',
    romantic: 'Warm & Elegant',
    dark: 'Harsh & Minimal',
    focused: 'Clean & Focused',
};

const MoodSelector = () => {
    const { currentMood, changeMood, availableMoods } = useMood();

    return (
        <motion.div {...fadeIn}>
            <Box
                sx={{
                    position: 'fixed',
                    top: 24,
                    right: 24,
                    display: 'flex',
                    gap: 1,
                    background: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '16px',
                    padding: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    zIndex: 1000,
                    transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                }}
            >
                {availableMoods.map((mood) => (
                    <Tooltip key={mood} title={moodDescriptions[mood]} arrow>
                        <IconButton
                            onClick={() => changeMood(mood)}
                            sx={{
                                fontSize: '1.5rem',
                                width: 48,
                                height: 48,
                                borderRadius: '12px',
                                background: currentMood === mood
                                    ? 'var(--mood-accent)'
                                    : 'transparent',
                                transition: 'all var(--mood-hover-duration) var(--mood-ease-curve)',
                                '&:hover': {
                                    background: currentMood === mood
                                        ? 'var(--mood-accent-light)'
                                        : 'rgba(255, 255, 255, 0.1)',
                                    transform: 'scale(1.1)',
                                },
                                border: currentMood === mood
                                    ? '2px solid var(--mood-accent-light)'
                                    : '2px solid transparent',
                            }}
                        >
                            {moodIcons[mood]}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
        </motion.div>
    );
};

export default MoodSelector;
