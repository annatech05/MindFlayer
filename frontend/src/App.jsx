import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";

// Screens / Components
import LandingScreen from "./components/LandingScreen";
import QuestionPhase from "./components/QuestionPhase";
import JudgmentPhase from "./components/JudgmentPhase";
import EndScreen from "./components/EndScreen";

// AI Logic
import questionPool from "./ai/questionPool";
import emotionalAnalyzer from "./ai/emotionalAnalyzer";
import questionSelector from "./ai/questionSelector";
import finalVerdictGenerator from "./ai/finalVerdictGenerator";

const MAX_QUESTIONS = 5;

function App() {
    const [phase, setPhase] = useState("landing");

    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [usedQuestions, setUsedQuestions] = useState(new Set());
    const [answers, setAnswers] = useState([]);


    const [sessionMemory, setSessionMemory] = useState([]);
    const [questionCount, setQuestionCount] = useState(0);

    const [currentJudgment, setCurrentJudgment] = useState(null);
    const [finalVerdict, setFinalVerdict] = useState("");

    // ---------------- START ----------------
    const handleStart = () => {
        const firstQuestion =
            questionPool.general[
            Math.floor(Math.random() * questionPool.general.length)
            ];

        setCurrentQuestion(firstQuestion);
        setUsedQuestions(new Set([firstQuestion]));
        setSessionMemory([]);
        setQuestionCount(1);
        setFinalVerdict("");
        setCurrentJudgment(null);
        setPhase("question");
    };

    // ---------------- ANSWER HANDLER ----------------
    const handleAnswerSubmit = (answer) => {
        // 1. Analyze emotion
        const analysis = emotionalAnalyzer(answer);

        // 2. Save memory
        const memoryEntry = {
            question: currentQuestion,
            answer,
            emotion: analysis.dominantEmotion,
            score: analysis.score,
        };

        const updatedMemory = [...sessionMemory, memoryEntry];
        setSessionMemory(updatedMemory);

        // 3. Show judgment (optional but keeps your UX)
        setCurrentJudgment({
            response: `Interesting. Your answer reflects ${analysis.dominantEmotion}.`,
            tone: analysis.dominantEmotion,
        });

        // 4. STOP → generate final summary
        if (questionCount >= MAX_QUESTIONS) {
            setPhase("analyzing");

            // Call Backend API
            fetch('http://localhost:5001/api/final-judgment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionHistory: updatedMemory })
            })
                .then(res => res.json())
                .then(data => {
                    setFinalVerdict(data);
                    setPhase("end");
                })
                .catch(err => {
                    console.error("API Error:", err);
                    const verdict = finalVerdictGenerator(updatedMemory);
                    setFinalVerdict(verdict);
                    setPhase("end");
                });
            return;
        }

        // 5. Select next adaptive question
        const nextQuestion = questionSelector(
            questionPool,
            analysis.dominantEmotion,
            usedQuestions
        );

        // Fallback safety
        if (!nextQuestion) {
            setPhase("analyzing");
            fetch('http://localhost:5001/api/final-judgment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionHistory: updatedMemory })
            })
                .then(res => res.json())
                .then(data => {
                    setFinalVerdict(data);
                    setPhase("end");
                })
                .catch(err => {
                    const verdict = finalVerdictGenerator(updatedMemory);
                    setFinalVerdict(verdict);
                    setPhase("end");
                });
            return;
        }

        // 6. Update state
        setUsedQuestions(prev => new Set(prev).add(nextQuestion));
        setCurrentQuestion(nextQuestion);
        setQuestionCount(prev => prev + 1);
        setPhase("question");
    };

    // ---------------- RESTART ----------------
    const handleRestart = () => {
        setPhase("landing");
        setUsedQuestions(new Set());
        setSessionMemory([]);
        setQuestionCount(0);
        setCurrentJudgment(null);
        setFinalVerdict("");
    };

    // ---------------- RENDER ----------------
    return (
        <div className="app-container">
            <AnimatePresence mode="wait">
                {phase === "landing" && (
                    <LandingScreen onStart={handleStart} />
                )}

                {phase === "question" && (
                    <QuestionPhase
                        key={currentQuestion}
                        question={currentQuestion}
                        onSubmit={handleAnswerSubmit}
                    />
                )}

                {phase === "analyzing" && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        flexDirection: 'column',
                        color: 'white',
                        fontFamily: 'monospace'
                    }}>
                        <h2>ANALYZING PSYCHE...</h2>
                        <p style={{ opacity: 0.7 }}>Extracting truth from your lies.</p>
                    </div>
                )}

                {phase === "end" && (
                    <EndScreen
                        sessionMemory={sessionMemory}
                        finalVerdict={finalVerdict}
                        onRestart={handleRestart}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default App;
