import responsePool from './responsePool';

// Map tones to background colors
const toneColorMap = {
    confrontational: '#EF476F', // Red
    realityCheck: '#FFB703',    // Amber
    wakeUpCall: '#4CC9F0',      // Blue
    denial: '#6C757D',          // Grey
    sarcastic: '#06D6A0',       // Teal/Green
    analytical: '#118AB2',      // Blue/Indigo
};

const responseSelector = (
    emotionalAnalysis,
    reflectionChoice = null,
    sessionMemory = []
) => {
    let { tone, traits = {} } = emotionalAnalysis;

    /* ------------------------------
       Tone adjustment via reflection
    --------------------------------*/
    if (reflectionChoice === 'hurt') {
        tone = 'realityCheck';
    } else if (reflectionChoice === 'disagree') {
        tone = Math.random() > 0.5 ? 'denial' : 'confrontational';
    }
    // 'continue' → keep analyzed tone

    /* ------------------------------
       Flow decision (ask or verdict)
    --------------------------------*/
    let nextAction = 'ask'; // 'ask' | 'verdict'

    // End conditions:
    // 1. High self-awareness (breakthrough)
    // 2. Strong avoidance + defensiveness (expose the pattern)
    if (
        traits.selfAwareness >= 4 ||
        (traits.avoidance >= 4 && traits.defensiveness >= 3)
    ) {
        nextAction = 'verdict';
    }

    /* ------------------------------
       Decide next question category
    --------------------------------*/
    let nextQuestionCategory = 'general';

    if (traits.avoidance >= 3) {
        nextQuestionCategory = 'avoidance';
    } else if (traits.defensiveness >= 3) {
        nextQuestionCategory = 'honesty';
    } else if (traits.overthinking >= 3) {
        nextQuestionCategory = 'control';
    } else if (traits.confidence <= -1) {
        nextQuestionCategory = 'fear';
    }

    /* ------------------------------
       Select AI response (non-repeat)
    --------------------------------*/
    const responses = responsePool[tone] || responsePool.realityCheck;

    const usedResponses = sessionMemory.map(m => m.response);
    const availableResponses = responses.filter(
        r => !usedResponses.includes(r)
    );

    const finalResponses =
        availableResponses.length > 0 ? availableResponses : responses;

    const selectedResponse =
        finalResponses[Math.floor(Math.random() * finalResponses.length)];

    const backgroundColor = toneColorMap[tone];

    /* ------------------------------
       Final output (UI-safe)
    --------------------------------*/
    return {
        response: selectedResponse,
        tone,
        backgroundColor,
        nextAction,
        nextQuestionCategory,
    };
};

export default responseSelector;
