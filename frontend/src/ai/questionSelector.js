const emotionToCategoryMap = {
    fear: "fear",
    avoidance: "avoidance",
    honesty: "honesty",
    control: "control",
    neutral: "general",
};

const getRandomUnusedQuestion = (questions, usedQuestions) => {
    const unused = questions.filter(q => !usedQuestions.has(q));
    if (unused.length === 0) return null;
    return unused[Math.floor(Math.random() * unused.length)];
};

const questionSelector = (questionPool, emotion, usedQuestions) => {
    const category =
        emotionToCategoryMap[emotion] || "general";

    // Try emotion-specific category first
    let question = getRandomUnusedQuestion(
        questionPool[category],
        usedQuestions
    );

    // Fallback: search all categories
    if (!question) {
        for (const key of Object.keys(questionPool)) {
            question = getRandomUnusedQuestion(
                questionPool[key],
                usedQuestions
            );
            if (question) break;
        }
    }

    return question;
};

export default questionSelector;
