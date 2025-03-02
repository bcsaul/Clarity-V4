import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY!)
const model = genAI.getGenerativeModel({ model: "gemini-pro" })

export async function generatePerspectives(title: string, facts: string[]) {
  const prompt = `
    Given this news story and facts, generate three different political perspectives (Left, Center, Right).
    Each perspective should have exactly three bullet points and maintain factual accuracy while showing
    the typical framing and emphasis of that political viewpoint.

    Title: ${title}

    Facts:
    ${facts.join("\n")}

    Format as JSON:
    {
      "left": {
        "points": ["point1", "point2", "point3"],
        "source": "source name",
        "sourceUrl": "url"
      },
      "center": {
        "points": ["point1", "point2", "point3"],
        "source": "source name",
        "sourceUrl": "url"
      },
      "right": {
        "points": ["point1", "point2", "point3"],
        "source": "source name",
        "sourceUrl": "url"
      }
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    return JSON.parse(text)
  } catch (error) {
    console.error("Failed to generate perspectives:", error)
    throw new Error("Failed to generate perspectives")
  }
}

export async function generateFactSummary(title: string, content: string) {
  const prompt = `
    Given this news story, generate three objective, factual bullet points.
    Focus only on verifiable information without any political bias.

    Title: ${title}
    Content: ${content}

    Format as JSON:
    {
      "facts": ["fact1", "fact2", "fact3"]
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const response = result.response
    const text = response.text()
    return JSON.parse(text)
  } catch (error) {
    console.error("Failed to generate summary:", error)
    throw new Error("Failed to generate summary")
  }
}

