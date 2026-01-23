import { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography, TextField, Button, Container } from '@mui/material';
import { fadeIn, buttonHover } from '../animations';
import useMoodStyles from '../hooks/useMoodStyles';

const QuestionPhase = ({ question, onSubmit }) => {
    const [answer, setAnswer] = useState('');
    const styles = useMoodStyles();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (answer.trim()) {
            onSubmit(answer);
            setAnswer('');
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                padding: 4,
                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 6,
                        alignItems: 'center',
                    }}
                >
                    {/* Left side - Question */}
                    <motion.div {...fadeIn}>
                        <Box
                            sx={{
                                background: 'var(--mood-question-box-gradient)',
                                borderRadius: 'var(--mood-button-radius)',
                                padding: 5,
                                boxShadow: 'var(--mood-focus-glow)',
                                position: 'relative',
                                overflow: 'hidden',
                                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                            }}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    color: 'var(--mood-bg-primary)',
                                    fontWeight: 'var(--mood-font-weight-bold)',
                                    fontFamily: 'var(--mood-font-family)',
                                    lineHeight: 1.3,
                                    position: 'relative',
                                    zIndex: 1,
                                    transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                }}
                            >
                                {question}
                            </Typography>
                        </Box>
                    </motion.div>

                    {/* Right side - Input */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 4,
                            }}
                        >
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'var(--mood-text-primary)',
                                    fontFamily: 'var(--mood-font-family)',
                                    fontWeight: 'var(--mood-font-weight-bold)',
                                    marginBottom: 2,
                                    textAlign: 'center',
                                    transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                }}
                            >
                                Your Answer
                            </Typography>

                            <TextField
                                multiline
                                rows={6}
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Type your honest answer here..."
                                variant="outlined"
                                fullWidth
                                autoFocus
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                        fontSize: '1.125rem',
                                        borderRadius: 'var(--mood-button-radius)',
                                        fontFamily: 'var(--mood-font-family)',
                                        '& fieldset': {
                                            borderColor: 'rgba(var(--mood-accent), 0.3)',
                                            borderWidth: 'var(--mood-input-border-width)',
                                            transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'var(--mood-accent)',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'var(--mood-accent)',
                                            boxShadow: 'var(--mood-focus-glow)',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'var(--mood-text-primary)',
                                    },
                                    '& .MuiInputBase-input::placeholder': {
                                        color: 'var(--mood-text-secondary)',
                                        opacity: 0.7,
                                    },
                                }}
                            />

                            <motion.div {...buttonHover} whileHover={{ scale: 'var(--mood-hover-scale)' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    disabled={!answer.trim()}
                                    sx={{
                                        background: 'linear-gradient(135deg, var(--mood-accent) 0%, var(--mood-accent-light) 100%)',
                                        fontSize: '1.125rem',
                                        padding: '16px',
                                        borderRadius: 'var(--mood-button-radius)',
                                        fontWeight: 600,
                                        transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, var(--mood-accent-light) 0%, var(--mood-accent) 100%)',
                                            boxShadow: 'var(--mood-focus-glow)',
                                        },
                                        '&:disabled': {
                                            background: 'rgba(255, 255, 255, 0.1)',
                                            color: 'rgba(255, 255, 255, 0.3)',
                                        },
                                    }}
                                >
                                    Submit
                                </Button>
                            </motion.div>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default QuestionPhase;
