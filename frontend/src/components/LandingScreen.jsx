import { motion } from 'framer-motion';
import { Button, Box, Typography } from '@mui/material';
import { dramaticEntrance, buttonHover } from '../animations';
import useMoodStyles from '../hooks/useMoodStyles';
import MoodSelector from './MoodSelector';

const LandingScreen = ({ onStart }) => {
    const styles = useMoodStyles();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'transparent',
                padding: 4,
                position: 'relative',
                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
            }}
        >
            <MoodSelector />

            <motion.div {...dramaticEntrance}>
                <Typography
                    variant="overline"
                    sx={{
                        display: 'block',
                        textAlign: 'center',
                        color: 'var(--mood-accent)',
                        fontSize: '1rem',
                        fontWeight: 700,
                        letterSpacing: '0.4em',
                        marginBottom: 2,
                        opacity: 0.8,
                        transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                    }}
                >
                    MINDFLAYER
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        textAlign: 'center',
                        marginBottom: 6,
                        background: 'linear-gradient(135deg, var(--mood-accent) 0%, var(--mood-accent-light) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        maxWidth: '800px',
                        fontFamily: 'var(--mood-font-family)',
                        fontWeight: 'var(--mood-font-weight-bold)',
                        letterSpacing: 'var(--mood-letter-spacing)',
                        lineHeight: 'var(--mood-line-height)',
                        transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                    }}
                >
                    Ready to be called out?
                </Typography>

                <Box sx={{ textAlign: 'center' }}>
                    <motion.div {...buttonHover} whileHover={{ scale: 'var(--mood-hover-scale)' }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={onStart}
                            sx={{
                                background: 'linear-gradient(135deg, var(--mood-accent) 0%, var(--mood-accent-light) 100%)',
                                fontSize: '1.25rem',
                                padding: '16px 48px',
                                borderRadius: 'var(--mood-button-radius)',
                                fontWeight: 600,
                                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, var(--mood-accent-light) 0%, var(--mood-accent) 100%)',
                                    boxShadow: 'var(--mood-focus-glow)',
                                },
                            }}
                        >
                            I'm ready.
                        </Button>
                    </motion.div>
                </Box>
            </motion.div>
        </Box>
    );
};

export default LandingScreen;
