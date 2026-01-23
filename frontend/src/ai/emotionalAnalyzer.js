const emotionalAnalyzer = (answer) => {
    const text = answer.toLowerCase();
    let score = {
        fear: 0,
        avoidance: 0,
        honesty: 0,
        control: 0,
    };

    if (text.match(/afraid|fear|scared|anxious|nervous/)) score.fear += 2;
    if (text.match(/later|delay|avoid|escape|busy/)) score.avoidance += 2;
    if (text.match(/truth|honest|admit|lie|hide/)) score.honesty += 2;
    if (text.match(/control|plan|fail|permission|perfect/)) score.control += 2;

    // Length-based signals
    if (answer.split(" ").length < 6) score.avoidance += 1;
    if (answer.split(" ").length > 40) score.control += 1;

    const dominantEmotion = Object.entries(score)
        .sort((a, b) => b[1] - a[1])[0][0];

    return {
        dominantEmotion,
        score,
    };
};

export default emotionalAnalyzer;
