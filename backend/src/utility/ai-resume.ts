const getGeminiAI = async () => {
  const { GoogleGenAI } = await import("@google/genai");

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not loaded");
  }

  console.log("Gemini API key loaded");

  return new GoogleGenAI({
    apiKey: apiKey
  });
};

export async function analyzeResume(resumeText: string) {

  const ai = await getGeminiAI();

  const prompt = `
You are an AI resume analyzer.

Analyze the following resume and return ONLY valid JSON.

The JSON must have exactly these fields:

{
  "skills": [],
  "roles": [],
  "experience": [],
  "education": []
}

Rules:

- skills: technical and professional skills found in the resume
- roles: suitable job roles based on the resume
- experience: technologies, projects or work experience
- education: degrees or educational qualifications
- Use short strings
- Do not add explanations outside JSON

Resume:

${resumeText.substring(0, 20000)}
`;

  const response = await ai.models.generateContent({
   model: "gemini-3.7-flash",
    contents: prompt
  });

  const content = response.text;

  if (!content) {
    throw new Error("Gemini did not return resume analysis");
  }

  let cleanContent = content.trim();

  if (cleanContent.startsWith("```json")) {
    cleanContent = cleanContent
      .replace(/^```json/, "")
      .replace(/```$/, "")
      .trim();
  }

  return JSON.parse(cleanContent);
}