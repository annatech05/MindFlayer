import { motion } from 'framer-motion';
import { Box, Button, Container } from '@mui/material';
import { fadeIn, buttonHover } from '../animations';
import useMoodStyles from '../hooks/useMoodStyles';

const ReflectionLoop = ({ onChoice }) => {
    const styles = useMoodStyles();
    const buttons = [
        { label: 'Continue', value: 'continue', color: 'var(--mood-accent)' },
        { label: 'That hurt', value: 'hurt', color: '#EF476F' },
        { label: "I don't agree", value: 'disagree', color: '#FFB703' },
    ];

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 4,
                background: 'linear-gradient(to top, var(--mood-bg-primary) 0%, transparent 100%)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
            }}
        >
            <Container maxWidth="md">
                <motion.div {...fadeIn}>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                        }}
                    >
                        {buttons.map((button) => (
                            <motion.div key={button.value} {...buttonHover} whileHover={{ scale: 'var(--mood-hover-scale)' }}>
                                <Button
                                    variant="outlined"
                                    onClick={() => onChoice(button.value)}
                                    sx={{
                                        borderColor: button.color,
                                        color: button.color,
                                        fontSize: '1rem',
                                        padding: '12px 32px',
                                        borderRadius: 'var(--mood-button-radius)',
                                        fontWeight: 'var(--mood-font-weight-bold)',
                                        fontFamily: 'var(--mood-font-family)',
                                        borderWidth: 'var(--mood-input-border-width)',
                                        transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                        '&:hover': {
                                            borderColor: button.color,
                                            backgroundColor: `${button.color}20`,
                                            borderWidth: 'var(--mood-input-border-width)',
                                            boxShadow: 'var(--mood-focus-glow)',
                                        },
                                    }}
                                >
                                    {button.label}
                                </Button>
                            </motion.div>
                        ))}
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ReflectionLoop;
