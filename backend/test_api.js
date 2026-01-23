
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5001';

async function testAnalyze() {
    console.log("Testing /api/analyze...");
    try {
        const response = await fetch(`${BASE_URL}/api/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                question: "What is your biggest fear?",
                userResponse: "I am afraid of failing and being alone.",
                history: []
            })
        });
        const data = await response.json();
        console.log("Analyze Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Analyze Test Failed:", error);
    }
}

async function testFinalJudgment() {
    console.log("\nTesting /api/final-judgment...");
    try {
        const response = await fetch(`${BASE_URL}/api/final-judgment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sessionHistory: [
                    { question: "Q1", answer: "A1", emotion: "fear", score: -0.5 },
                    { question: "Q2", answer: "A2", emotion: "sadness", score: -0.2 }
                ]
            })
        });
        const data = await response.json();
        console.log("Final Judgment Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Final Judgment Test Failed:", error);
    }
}

(async () => {
    await testAnalyze();
    await testFinalJudgment();
})();
