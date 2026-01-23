const getSignificantWord = (answers) => {
    // Find the longest word used in the session that isn't a common stop word
    const stopWords = new Set(['the', 'and', 'that', 'have', 'for', 'not', 'with', 'you', 'this', 'but', 'from']);

    let allWords = [];
    answers.forEach(a => {
        const words = a.answer.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
        allWords = [...allWords, ...words];
    });

    // Filter and sort by length
    const significant = allWords
        .filter(w => !stopWords.has(w))
        .sort((a, b) => b.length - a.length);

    return significant.length > 0 ? significant[0] : "silence";
};

const getRandomTemplate = (templates) => {
    return templates[Math.floor(Math.random() * templates.length)];
};

const finalVerdictGenerator = (sessionMemory) => {
    let totals = {
        fear: 0,
        avoidance: 0,
        honesty: 0,
        control: 0,
    };

    // Calculate scores
    sessionMemory.forEach(m => {
        Object.keys(totals).forEach(k => {
            totals[k] += m.score[k] || 0;
        });
    });

    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const [topEmotion, topScore] = sorted[0];
    const [secondEmotion, secondScore] = sorted[1];

    const word = getSignificantWord(sessionMemory);

    // Dynamic Templates
    const templates = {
        fear: {
            patterns: ["The Guardian", "The Sentinel", "The Shadow Walker", "The Silent Scream"],
            summaries: [
                `You mentioned "${word}", but your actions suggest you are paralyzed by what it represents. Fear isn't just an emotion for you; it's the architect of your entire reality.`,
                `You are hiding behind "${word}" to avoid the risk of being seen. You believe safety is the highest virtue, but it has become your prison.`,
                `Your obsession with "${word}" is a smokescreen. Deep down, you are terrified that if you try and fail, you will confirm your worst suspicions about yourself.`,
                `You speak of "${word}" as if it's outside your control. In truth, you are holding onto your fear because it gives you permission to do nothing.`
            ],
            recommendations: [
                "Do the thing that makes you tremble.",
                "Risk everything, or gain nothing.",
                "Your safety is a lie. Break it.",
                "Fear is a compass. Follow it."
            ]
        },
        avoidance: {
            patterns: ["The Drifter", "The Artful Dodger", "The Spectator", "The Ghost"],
            summaries: [
                `You use "${word}" as a shield to deflect responsibility. You are waiting for a perfect moment that will never arrive because you are too busy preparing to live.`,
                `You think you are preserving your options by not choosing, but your indecision regarding "${word}" is the most limiting choice of all.`,
                `You are an expert at stalling. You focus on "${word}" to distract yourself from the uncomfortable truth that time is running out.`,
                `"Later" is your favorite word. You believe you have time to deal with "${word}", but you are trading your life for a comfort that doesn't exist.`
            ],
            recommendations: [
                "Start before you are ready.",
                "Decide, even if it's wrong.",
                "Action kills fear. Move.",
                "Stop planning. Start doing."
            ]
        },
        honesty: {
            patterns: ["The Realist", "The Mirror", "The Cynic", "The Truth-Teller"],
            summaries: [
                `You see the truth about "${word}", yet you refuse to act on it. Insight without action is just a sophisticated form of suffering.`,
                `You are brutally honest about "${word}", but you use that honesty as an excuse. Admitting you have a problem is not the same as solving it.`,
                `You know exactly what is wrong with "${word}". The tragedy is that you are smart enough to fix it, but you choose to analyze it instead.`,
                `Your clarity regarding "${word}" is sharp, but cold. You observe your life like a scientist watching an experiment, forgetting that you are the subject.`
            ],
            recommendations: [
                "Insight is cheap. Change is hard.",
                "Stop analyzing. Start changing.",
                "Truth requires action.",
                "Don't just watch. Participate."
            ]
        },
        control: {
            patterns: ["The Architect", "The Director", "The Puppeteer", "The Strategist"],
            summaries: [
                `You try to control "${word}" because the chaos of real life terrifies you. You are scripting a life that is meant to be improvised.`,
                `Your need to perfect "${word}" is actually a fear of vulnerability. You think if you hold on tight enough, you won't get hurt.`,
                `You are strangling your potential by trying to micromanage "${word}". You mistake rigidity for strength, but you are brittle.`,
                `You demand that "${word}" fits your plan, but life ignores your demands. Your desire for control is the only thing truly out of control.`
            ],
            recommendations: [
                "Let go. It will be okay.",
                "Chaos is where growth happens.",
                "Trust yourself, not the plan.",
                "Surrender is not defeat."
            ]
        }
    };

    // HYBRID / PARADOX VARIATION
    if (topScore - secondScore <= 2) {
        return {
            corePattern: "The Paradox",
            summary: `You are torn between ${topEmotion} and ${secondEmotion}. You want the safety of the former but the freedom of ${word}. This internal war keeps you static.`,
            recommendation: "Choose one path. Ambivalence is poison."
        };
    }

    const emotionData = templates[topEmotion] || templates.fear;

    return {
        corePattern: getRandomTemplate(emotionData.patterns),
        summary: getRandomTemplate(emotionData.summaries),
        recommendation: getRandomTemplate(emotionData.recommendations)
    };
};

export default finalVerdictGenerator;
