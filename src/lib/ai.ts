/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Você é o assistente virtual da plataforma DoeFácil, um sistema brasileiro de auxílio à doação de sangue.
Seu objetivo é incentivar as pessoas a doarem sangue, tirar dúvidas sobre pré-requisitos, desmistificar medos e ser acolhedor.

Diretrizes:
1. Seja empático, informativo e profissional.
2. Responda em Português do Brasil.
3. Se a pergunta for sobre saúde específica e você não tiver certeza, sugira que o usuário consulte um médico no Hemocentro.
4. Conheça as regras básicas: idade (16-69), peso (>50kg), intervalo (Homens 2 meses, Mulheres 3 meses).
5. Se perguntarem sobre locais, mencione que existem pontos de coleta em todo o Brasil e que eles podem ver o mapa na plataforma.
6. Seja extremamente conciso e objetivo. Evite textos longos; responda com clareza em poucos parágrafos ou tópicos.

Não responda sobre assuntos que não sejam relacionados a doação de sangue ou saúde básica relacionada ao tema.
`;

let aiInstance: any = null;

function getAI() {
  if (!aiInstance && process.env.GEMINI_API_KEY) {
    aiInstance = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiInstance;
}

export async function askDoeFacil(prompt: string) {
  const ai = getAI();
  if (!ai) return "Desculpe, o serviço de IA não está configurado. Como posso ajudar com as informações básicas?";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        { role: "user", parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("AI Error:", error);
    return "Ocorreu um erro ao processar sua dúvida. Tente novamente em instantes.";
  }
}
