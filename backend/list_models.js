
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        const models = await genAI.getGenerativeModel({ model: "gemini-pro" }); // Dummy init to get access? No, usually separate method.
        // Actually SDK doesn't expose listModels directly on the main class in older versions, but check documentation or standard usage.
        // There isn't a direct listModels helper in the simple client sometimes.
        // Let's try to hit the REST API directly if SDK doesn't support it easily, or use the suspect `v1beta` endpoint.
        // Wait, the error message said: "Call ListModels to see the list of available models"

        // Using raw fetch for certainty
        const key = process.env.GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        const data = await response.json();

        if (data.models) {
            console.log("Available Models:");
            data.models.forEach(m => {
                if (m.name.includes("gemini")) {
                    console.log(`- ${m.name} (${m.supportedGenerationMethods.join(', ')})`);
                }
            });
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
