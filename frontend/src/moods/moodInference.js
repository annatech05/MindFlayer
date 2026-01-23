import moodConfigs from '../moods/moodConfigs';

// AI-driven mood inference based on emotional analysis
const inferMoodFromAnalysis = (emotionalAnalysis, currentMood, sessionMemory = []) => {
    const { tone, intensity, hadHesitation, hadDefensive, hadAvoidance, wordCount } = emotionalAnalysis;

    // Don't change mood too frequently - only if strong pattern detected
    const recentMoodChanges = sessionMemory.filter(m => m.moodChanged).length;
    if (recentMoodChanges >= 2 && sessionMemory.length < 4) {
        // Too many mood changes, keep current
        return currentMood;
    }

    // Mapping rules based on user patterns

    // Very defensive or in denial → Dark mood
    if (tone === 'denial' || (hadDefensive && hadHesitation)) {
        return 'dark';
    }

    // Confrontational tone with short answers → Energetic (wake them up)
    if (tone === 'confrontational' && wordCount < 10) {
        return 'energetic';
    }

    // Wake-up-call tone → Energetic
    if (tone === 'wakeUpCall') {
        return 'energetic';
    }

    // Self-aware and thoughtful (long answers) → Focused
    if (wordCount > 30 && !hadHesitation && !hadDefensive) {
        return 'focused';
    }

    // Reality-check tone with openness → Calm
    if (tone === 'realityCheck' && !hadDefensive) {
        return 'calm';
    }

    // Emotional intensity detected → Romantic
    if (intensity === 'high' && !hadDefensive) {
        return 'romantic';
    }

    // Hesitation without defensiveness → Calm (gentle approach)
    if (hadHesitation && !hadDefensive) {
        return 'calm';
    }

    // Avoidance patterns → Energetic (need energy to break through)
    if (hadAvoidance) {
        return 'energetic';
    }

    // Default: keep current mood or use focused
    return currentMood || 'focused';
};

// Determine if mood should change (to avoid too frequent changes)
const shouldChangeMood = (newMood, currentMood, sessionMemory) => {
    // Always allow first mood set
    if (!currentMood) return true;

    // Don't change if same mood
    if (newMood === currentMood) return false;

    // Only change mood every 2 questions minimum
    const questionsSinceLastChange = sessionMemory.filter(m => !m.moodChanged).length;
    if (questionsSinceLastChange < 2) return false;

    return true;
};

export { inferMoodFromAnalysis, shouldChangeMood };
