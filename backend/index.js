import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
console.log('App created. Type:', typeof app, 'Is function:', typeof app.get);
const PORT = process.env.PORT || 5001;

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

app.use(cors());
app.use(express.json());

// Root route removed to allow static serving

const ANALYSIS_RULES = [
    {
        id: 'distraction',
        keywords: ['phone', 'scroll', 'social media', 'video', 'netflix', 'game', 'youtube', 'tiktok', 'instagram', 'app', 'twitter', 'reddit'],
        responses: [
            { verdict: "You are trading your future for cheap dopamine.", reason: "Your focus is fragmented by digital noise. You're not busy; you're just distracted.", tone: 'sarcastic' },
            { verdict: "Digital anesthetic won't heal your boredom.", reason: "You use your screen to hide from the silence where your ambition lives.", tone: 'analytical' },
            { verdict: "Your attention is a commodity you're giving away for free.", reason: "The algorithm knows you better than you know yourself.", tone: 'confrontational' },
            { verdict: "Infinite scroll is a treadmill that goes nowhere.", reason: "You're running as fast as you can just to stay exactly where you are.", tone: 'analytical' },
            { verdict: "Notifications are the heartbeat of your insecurity.", reason: "You need a device to tell you you're important because you don't believe it yourself.", tone: 'confrontational' }
        ]
    },
    {
        id: 'food_escapism',
        keywords: ['eat', 'food', 'snack', 'cake', 'sugar', 'chocolate', 'drink', 'pizza', 'hungry', 'burger', 'chips'],
        responses: [
            { verdict: "You consume to avoid feeling.", reason: "Using food as a temporary mute button for your anxiety is a failing strategy.", tone: 'analytical' },
            { verdict: "Hunger of the soul can't be satisfied by the mouth.", reason: "You're trying to fill a psychological void with physical weight.", tone: 'confrontational' },
            { verdict: "Emotional eating is just a slow-motion scream.", reason: "You're swallowing your problems instead of solving them.", tone: 'analytical' },
            { verdict: "The kitchen is your bunker.", reason: "You hide in flavors because the real world is too bland or too bitter for you.", tone: 'sarcastic' },
            { verdict: "Digestive distractions are your favorite shield.", reason: "You'd rather deal with a stomach ache than a heart ache.", tone: 'confrontational' }
        ]
    },
    {
        id: 'secrecy',
        keywords: ['hide', 'secret', 'no one knows', 'private', 'mask', 'pretend', 'lie', 'truth', 'anonymous', 'dark side'],
        responses: [
            { verdict: "The person you show the world is a ghost.", reason: "You spend more energy maintaining the mask than living your actual life.", tone: 'confrontational' },
            { verdict: "Transparency is your only escape.", reason: "Hiding doesn't keep you safe; it just keeps you lonely in your own head.", tone: 'analytical' },
            { verdict: "You're living a performance, not a life.", reason: "The audience is smaller than you think, and they can see the cracks.", tone: 'sarcastic' },
            { verdict: "Secrets are the anchors of your growth.", reason: "You're trying to fly while carrying a thousand things you're too afraid to name.", tone: 'analytical' },
            { verdict: "Your 'private self' is becoming your only self.", reason: "When you hide everything, there's eventually nothing left to find.", tone: 'confrontational' }
        ]
    },
    {
        id: 'success_fear',
        keywords: ['responsibility', 'high', 'fall', 'pressure', 'expectations', 'success', 'win', 'goal', 'peak', 'lead'],
        responses: [
            { verdict: "You aren't afraid of failure; you're afraid of the work success requires.", reason: "Staying small is comfortable. Being great means you can't hide anymore.", tone: 'analytical' },
            { verdict: "Victory is a weight you aren't ready to carry.", reason: "You sabotage yourself because you're terrified of what happens when the excuses run out.", tone: 'confrontational' },
            { verdict: "The view from the top scares you.", reason: "You're intentionally keeping yourself in the fog so you don't have to see how far you could go.", tone: 'sarcastic' },
            { verdict: "Success means no one to blame but yourself.", reason: "You prefer the safety of mediocrity where you can point fingers at 'the system'.", tone: 'confrontational' }
        ]
    },
    {
        id: 'perfectionism',
        keywords: ['perfect', 'ready', 'prepared', 'right time', 'waiting', 'plan', 'best', 'masterpiece', 'flawless'],
        responses: [
            { verdict: "Perfectionism is just procrastination in a suit.", reason: "You're using 'high standards' as a shield against the risk of actually doing something.", tone: 'analytical' },
            { verdict: "The 'perfect moment' is a myth you use to stay safe.", reason: "Done is better than perfect. You're just waiting for a guarantee that doesn't exist.", tone: 'sarcastic' },
            { verdict: "You're polishing a stone while the world builds cathedrals.", reason: "Small improvements on a non-existent project are the ultimate self-delusion.", tone: 'analytical' },
            { verdict: "Flawless is another word for 'never started'.", reason: "You're so afraid of a mistake that you've opted for total invisibility.", tone: 'confrontational' }
        ]
    }
];

const NEUTRAL_TEMPLATES = {
    verdicts: [
        "A mediocre response for a mediocre mindset.",
        "Your lack of conviction is palpable.",
        "I'm detecting a severe case of 'autopilot'.",
        "Boring is a choice, and you're making it.",
        "Your answer is a visual sigh.",
        "Lukewarm honesty is worse than a bold lie.",
        "You're coasting through this interaction.",
        "There is a hollow space where your passion should be.",
        "You are the architect of your own boredom.",
        "Your compliance with the average is noted."
    ],
    reasons: [
        "You're giving me nothing because you're giving yourself nothing.",
        "You're muting your own voice to avoid the risk of being wrong.",
        "This level of neutrality is a sophisticated form of hiding.",
        "You're operating on a script you didn't even write.",
        "You treat your life like a waiting room for a future that won't arrive.",
        "Every bland word is a brick in the wall of your stagnancy.",
        "You're playing it safe, but safety is the most dangerous place to be.",
        "I'd challenge you, but you've already conceded to the 'fine'.",
        "You're hiding in the middle because the edges are too sharp for you.",
        "Your honesty has been filtered until it's flavorless."
    ]
};

const CATEGORIES = {
    FEAR: [
        { verdict: "Fear is the only thing you're truly committed to.", reason: "You use anxiety as a compass, then wonder why you're always lost.", tone: 'confrontational' },
        { verdict: "The shadow you're running from is your own potential.", reason: "It's easier to be 'scared' than to be responsible for your own greatness.", tone: 'analytical' }
    ],
    HESITATION: [
        { verdict: "Your 'maybe' is a polite death warrant.", reason: "You're waiting for a green light in a city that only has red ones.", tone: 'sarcastic' },
        { verdict: "Deciding not to decide is still a decision.", reason: "You're just choosing the default path of least resistance.", tone: 'analytical' }
    ]
};

const HESITATION_KEYWORDS = ['maybe', 'later', 'think', 'possibly', 'might', 'soon', 'eventually', 'decide', 'not sure', 'perhaps', 'wait', 'unsure'];
const FEAR_KEYWORDS = ['scared', 'fail', 'failure', 'nervous', 'terrified', 'anxious', 'worried', 'dread', 'loss', 'rejection', 'mistake', 'fear', 'afraid'];
const AVOIDANCE_KEYWORDS = ['busy', 'no time', 'tomorrow', 'skip', 'ignore', 'later', 'next week', 'hard', 'tired', 'effort', 'try', 'will', 'later'];

const recentVerdicts = new Set();
const MAX_HISTORY = 25;

app.post('/api/analyze', async (req, res) => {
    const { question, userResponse, history = [] } = req.body;
    const timestamp = new Date().toLocaleTimeString();

    if (!userResponse) return res.status(400).json({ error: 'userResponse is required' });

    console.log(`[${timestamp}] Incoming Answer: "${userResponse}"`);

    try {
        // Prepare prompt for Gemini
        const prompt = `
        You are the "MindFlayer AI Judgment Engine". Your goal is to provide a blunt, psychologically-styled "uncomfortable truth" based on user input, and then ask a deep, probing follow-up question.
        
        Last Question Asked: "${question}"
        User Answer: "${userResponse}"
        Session History: ${JSON.stringify(history)}

        Return a JSON object with:
        1. "verdict": A short, punchy sentence judging the user's state (max 10 words).
        2. "reason": A deeper psychological analysis of why they answered this way (max 30 words).
        3. "tone": One of ["confrontational", "analytical", "sarcastic", "realityCheck"].
        4. "confidence": A number from 15-100.
        5. "nextQuestion": A specific follow-up question that digs deep into their answer (max 15 words).

        Personality: Direct, slightly intimidating, insightful, no motivational fluff.
        `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
            ]
        });
        const responseText = result.response.text();
        const backendData = JSON.parse(responseText);

        console.log(`[${timestamp}] Gemini Verdict: "${backendData.verdict}"`);
        return res.json({
            ...backendData,
            v: "4.0-GEMINI-2.5-FLASH"
        });
    } catch (error) {
        console.error("Gemini Error, falling back to local logic:", error);
    }

    // --- FALLBACK TO LOCAL LOGIC (v3.0) ---
    const lowerResponse = userResponse.toLowerCase();
    let result = null;
    let confidence = 40 + Math.floor(Math.random() * 15);

    // 1. Behavior Rule Search
    for (const rule of ANALYSIS_RULES) {
        const matches = rule.keywords.filter(k => lowerResponse.includes(k));
        if (matches.length > 0) {
            const pool = rule.responses.filter(r => !recentVerdicts.has(r.verdict));
            const finalPool = pool.length > 0 ? pool : rule.responses;
            result = { ...finalPool[Math.floor(Math.random() * finalPool.length)] };
            confidence += (matches.length * 12);
            break;
        }
    }

    // 2. Category Fallback
    if (!result) {
        let category = null;
        if (FEAR_KEYWORDS.some(k => lowerResponse.includes(k))) category = 'FEAR';
        else if (HESITATION_KEYWORDS.some(k => lowerResponse.includes(k))) category = 'HESITATION';

        if (category && CATEGORIES[category]) {
            const pool = CATEGORIES[category].filter(r => !recentVerdicts.has(r.verdict));
            const finalPool = pool.length > 0 ? pool : CATEGORIES[category];
            result = { ...finalPool[Math.floor(Math.random() * finalPool.length)] };
        }
    }

    // 3. Template-Based Procedural Neutral Generation
    if (!result) {
        const vPool = NEUTRAL_TEMPLATES.verdicts.filter(v => !recentVerdicts.has(v));
        const rPool = NEUTRAL_TEMPLATES.reasons.filter(r => !recentVerdicts.has(r));
        const finalVPool = vPool.length > 0 ? vPool : NEUTRAL_TEMPLATES.verdicts;
        const finalRPool = rPool.length > 0 ? rPool : NEUTRAL_TEMPLATES.reasons;

        result = {
            verdict: finalVPool[Math.floor(Math.random() * finalVPool.length)],
            reason: finalRPool[Math.floor(Math.random() * finalRPool.length)],
            tone: Math.random() > 0.5 ? 'sarcastic' : 'analytical'
        };
    }

    recentVerdicts.add(result.verdict);
    if (recentVerdicts.size > MAX_HISTORY) {
        const first = recentVerdicts.values().next().value;
        recentVerdicts.delete(first);
    }

    res.json({
        ...result,
        nextQuestion: "Why do you continue to hide behind these words?", // Static fallback
        confidence: Math.min(Math.max(confidence, 15), 100),
        v: "3.0-FALLBACK"
    });
});

app.post('/api/final-judgment', async (req, res) => {
    const { sessionHistory } = req.body;

    try {
        const prompt = `
        You are the "MindFlayer AI Judgment Engine". Analyze the following session of answers provided by a user.
        History: ${JSON.stringify(sessionHistory)}

        Provide a final, holistic judgment of this person's psyche. 
        CRITICAL: You MUST quote specific words or phrases they used in their answers to prove you were listening.
        
        Be blunt, clinical, and slightly intimidating. 
        Identify their core patterns of avoidance, fear, or self-delusion based on EXPLICIT evidence from their answers.

        Return a JSON object with:
        1. "summary": A final paragraph (max 60 words) that directly references their specific answers.
        2. "corePattern": A short title for their behavior (e.g., "The Passive Architect").
        3. "recommendation": A final, blunt piece of advice (max 60 words).
        `;

        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            safetySettings: [
                { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
            ]
        });
        const responseText = result.response.text();
        return res.json(JSON.parse(responseText));
    } catch (error) {
        console.error("FINAL JUDGMENT ERROR:", error);
        import('fs').then(fs => fs.writeFileSync('error.log', `Error: ${error.message}\nStack: ${error.stack}\n`));


        // --- FALLBACK LOGIC ---
        const fallbackResponse = {
            summary: "You are hiding behind a veil of curated answers. Your reluctance to be vulnerable suggests a deep-seated fear of judgment, which is ironic considering you are here. You crave validation but refuse to pay the price of honesty.",
            corePattern: "The Shadow Boxer",
            recommendation: "Stop fighting ghosts. Face yourself. You are the only person who can unlock the cage you built.",
            v: "FALLBACK-LOCAL"
        };

        return res.json(fallbackResponse);
    }
});

// --- SERVE FRONTEND (Deployment) ---

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory (which contains the React build)
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve index.html for client-side routing
console.log('Registering SPA fallback...');
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`MindFlayer Engine v4.0-GEMINI running at http://localhost:${PORT}`);
});

