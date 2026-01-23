import { motion } from 'framer-motion';
import { Box, Typography, Container, Button } from '@mui/material';
import { fadeIn, buttonHover } from '../animations';
import useMoodStyles from '../hooks/useMoodStyles';
import MoodSelector from './MoodSelector';

const EndScreen = ({ sessionMemory, onRestart, finalVerdict }) => {
    const styles = useMoodStyles();

    // Analyze patterns from session (Local fallback)
    const patterns = [];
    const hesitationCount = sessionMemory.filter(m => m.analysis?.hadHesitation).length;
    const defensiveCount = sessionMemory.filter(m => m.analysis?.hadDefensive).length;
    const avoidanceCount = sessionMemory.filter(m => m.analysis?.hadAvoidance).length;

    if (hesitationCount >= 2) patterns.push("You hesitate when you already know the answer.");
    if (defensiveCount >= 2) patterns.push("You defend yourself instead of accepting reality.");
    if (avoidanceCount >= 2) patterns.push("You avoid commitment by hiding behind circumstances.");

    if (patterns.length === 0) {
        patterns.push("You're more honest with yourself than most.");
        patterns.push("But honesty without action is just awareness.");
    }

    console.log("EndScreen Debug:", { finalVerdict, patterns, sessionMemory }); // DEBUG LOG

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                background: 'transparent',
                padding: 4,
                position: 'relative',
                transition: 'all var(--mood-transition-speed) var(--mood-ease-curve)',
            }}
        >
            <MoodSelector />

            <Container maxWidth="md">
                <motion.div {...fadeIn}>
                    <Typography
                        variant="h2"
                        sx={{
                            textAlign: 'center',
                            marginBottom: 4,
                            color: 'var(--mood-accent)',
                            fontFamily: 'var(--mood-font-family)',
                            fontWeight: 'var(--mood-font-weight-bold)',
                            fontSize: '3rem',
                            textTransform: 'uppercase', // Make it punchy
                            letterSpacing: '2px'
                        }}
                    >
                        {finalVerdict?.corePattern || "The Silent Observer"}
                    </Typography>

                    <Box
                        sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: 'var(--mood-button-radius)',
                            padding: 5,
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            marginBottom: 6,
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        {finalVerdict && finalVerdict.summary ? (
                            <Box>
                                <Typography variant="h5" sx={{ color: 'rgba(var(--mood-text-primary), 0.7)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 2 }}>
                                    Holistic Summary
                                </Typography>
                                <Typography variant="h4" sx={{ color: 'var(--mood-text-primary)', marginBottom: 5, fontStyle: 'italic', fontWeight: '300', lineHeight: 1.6 }}>
                                    "{finalVerdict.summary}"
                                </Typography>

                                <Typography variant="h5" sx={{ color: 'var(--mood-accent)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: 2 }}>
                                    Final Advice
                                </Typography>
                                <Typography variant="h4" sx={{ color: 'var(--mood-text-primary)', fontWeight: 'bold' }}>
                                    {finalVerdict.recommendation}
                                </Typography>
                            </Box>
                        ) : (
                            patterns.map((pattern, index) => (
                                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.3 }}>
                                    <Typography variant="h4" sx={{ color: 'var(--mood-text-primary)', marginBottom: 3 }}>
                                        {pattern}
                                    </Typography>
                                </motion.div>
                            ))
                        )}
                    </Box>

                    <Box sx={{ textAlign: 'center' }}>
                        <motion.div {...buttonHover}>
                            <Button
                                variant="outlined"
                                onClick={onRestart}
                                sx={{
                                    borderColor: 'var(--mood-accent)',
                                    color: 'var(--mood-accent)',
                                    padding: '16px 50px',
                                    borderRadius: '50px',
                                    '&:hover': { backgroundColor: 'rgba(var(--mood-accent), 0.1)' }
                                }}
                            >
                                Re-Enter the Mirror
                            </Button>
                        </motion.div>
                    </Box>
                </motion.div>
            </Container>
        </Box>
    );
};

export default EndScreen;
