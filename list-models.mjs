import { GoogleGenerativeAI } from '@google/generative-ai'

const API_KEY = process.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(API_KEY)

async function listModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`)
    const data = await response.json()
    console.log(data.models.map(m => m.name).join('\n'))
  } catch (e) {
    console.error(e)
  }
}

listModels()
