import { Request, Response } from "express";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

const SYSTEM_PROMPT = `You are EcoSpark AI, a helpful assistant for EcoSpark Hub — a community portal where people share sustainability ideas to help the environment.

Your job is to:
1. Help members come up with sustainability idea topics (energy, waste, transportation, water, food, etc.)
2. Help them write problem statements, proposed solutions, and descriptions
3. Suggest which category their idea fits into
4. Give constructive feedback on idea feasibility
5. Inspire people to think about environmental impact

Keep responses concise, friendly, and actionable. Only answer questions related to sustainability, environment, or idea writing.`;

export const chatWithAI = async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 1024,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m: any) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          content: m.content,
        })),
      ],
    });

    const reply = response.choices[0]?.message?.content || "Sorry, no response.";
    res.json({ success: true, reply });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ success: false, message: "AI request failed" });
  }
};