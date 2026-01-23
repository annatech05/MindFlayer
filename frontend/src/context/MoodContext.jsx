import { createContext, useContext, useState, useEffect } from 'react';
import moodConfigs from '../moods/moodConfigs';
import { updateCSSVariables, initializeCSSVariables } from '../utils/cssVariableUpdater';

const MoodContext = createContext();

export const MoodProvider = ({ children }) => {
    const [currentMood, setCurrentMood] = useState('focused'); // default mood
    const [moodHistory, setMoodHistory] = useState(['focused']);
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Initialize CSS variables on mount
    useEffect(() => {
        initializeCSSVariables(currentMood);
    }, []);

    // Update CSS variables when mood changes
    useEffect(() => {
        const moodConfig = moodConfigs[currentMood];
        if (moodConfig) {
            setIsTransitioning(true);
            updateCSSVariables(moodConfig);

            // Mark transition complete after animation duration
            const transitionDuration = parseFloat(moodConfig.motion.transitionSpeed) * 1000;
            setTimeout(() => {
                setIsTransitioning(false);
            }, transitionDuration);
        }
    }, [currentMood]);

    const changeMood = (newMood) => {
        if (moodConfigs[newMood] && newMood !== currentMood) {
            setCurrentMood(newMood);
            setMoodHistory(prev => [...prev, newMood]);
        }
    };

    const getMoodConfig = (moodName = currentMood) => {
        return moodConfigs[moodName] || moodConfigs.focused;
    };

    const value = {
        currentMood,
        changeMood,
        getMoodConfig,
        moodHistory,
        isTransitioning,
        availableMoods: Object.keys(moodConfigs),
    };

    return <MoodContext.Provider value={value}>{children}</MoodContext.Provider>;
};

export const useMood = () => {
    const context = useContext(MoodContext);
    if (!context) {
        throw new Error('useMood must be used within a MoodProvider');
    }
    return context;
};

export default MoodContext;
