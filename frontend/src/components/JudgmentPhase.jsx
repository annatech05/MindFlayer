import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Typography, Container } from '@mui/material';
import { lineReveal, glowPulse } from '../animations';
import useMoodStyles from '../hooks/useMoodStyles';

const JudgmentPhase = ({ judgment, backgroundColor, tone, confidence }) => {
    const [maxVisibleIndex, setMaxVisibleIndex] = useState(-1);
    const styles = useMoodStyles();
    const { config } = styles;

    // Split judgment into lines
    const lines = judgment.split('\n').filter(line => line.trim());

    useEffect(() => {
        setMaxVisibleIndex(-1);
        const revealDelay = (parseFloat(config.motion.transitionSpeed) * 1000) + 200;

        const timers = lines.map((_, index) => {
            return setTimeout(() => {
                setMaxVisibleIndex(index);
            }, (index + 1) * revealDelay);
        });

        return () => {
            timers.forEach(clearTimeout);
        };
    }, [judgment, config.motion.transitionSpeed, lines.length]);

    return (
        <Box
            component={motion.div}
            animate={{
                backgroundColor: backgroundColor ? `${backgroundColor}20` : 'transparent',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Container maxWidth="md">
                <Box
                    component={motion.div}
                    {...glowPulse}
                    sx={{
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(30px)',
                        borderRadius: '16px',
                        padding: { xs: 4, md: 8 },
                        border: `2px solid ${backgroundColor || 'var(--mood-accent)'}80`,
                        position: 'relative',
                        zIndex: 1,
                        boxShadow: `0 0 50px ${backgroundColor}30`
                    }}
                >
                    {/* Engine Metadata Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 6, borderBottom: '1px solid rgba(255,255,255,0.1)', pb: 2 }}>
                        <Typography sx={{ color: backgroundColor, textTransform: 'uppercase', letterSpacing: 2, fontWeight: 800, fontSize: '0.75rem' }}>
                            Engine Tone: {tone || 'Analyzing...'}
                        </Typography>
                        <Typography sx={{ color: '#fff', opacity: 0.6, fontSize: '0.75rem', fontFamily: 'monospace' }}>
                            Confidence: {confidence || 0}%
                        </Typography>
                    </Box>

                    <AnimatePresence>
                        {lines.map((line, index) => (
                            index <= maxVisibleIndex && (
                                <motion.div
                                    key={`${index}-${line.substring(0, 10)}`}
                                    {...lineReveal(0)}
                                    style={{ marginBottom: index < lines.length - 1 ? '32px' : 0 }}
                                >
                                    <Typography
                                        variant={index === 0 ? "h2" : "h4"}
                                        sx={{
                                            color: index === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.8)',
                                            fontWeight: index === 0 ? 800 : 400,
                                            fontFamily: 'var(--mood-font-family)',
                                            lineHeight: 1.4,
                                            textAlign: 'center',
                                            textShadow: index === 0 ? `0 0 30px ${backgroundColor}80` : 'none',
                                        }}
                                    >
                                        {line}
                                    </Typography>
                                </motion.div>
                            )
                        ))}
                    </AnimatePresence>

                    {/* Scanline effect for "Judgment Engine" feel */}
                    <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                        zIndex: 2,
                        backgroundSize: '100% 2px, 3px 100%',
                        pointerEvents: 'none',
                        opacity: 0.3
                    }} />
                </Box>
            </Container>
        </Box>
    );
};

export default JudgmentPhase;
