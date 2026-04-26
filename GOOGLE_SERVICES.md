## 1. Google Gemini API (Primary AI)
SDK: @google/generative-ai
Model: gemini-1.5-flash
File: src/services/gemini.js
Functions:
  generateVotingPlan(userProfile) — returns structured JSON
  explainStep(step, userProfile) — returns explanation text
Prompt architecture: user profile variables + JSON schema enforcement + scoring formula + language rules
Why: only service that can generate structured, personalized, multilingual JSON plans

## 2. Google Cloud Run (Deployment)
Config: cloudbuild.yaml
Region: asia-south1 (Mumbai — lowest latency for India)
Server: server.js (Express with CSP headers)
Why: mandatory tool, serverless, auto-scaling, secure env variable injection for API key

## 3. Google Antigravity (Development)
Used for: entire application development
Stitch MCP: generated all 8 UI components (LogoMark, LanguageToggle, QuestionFlow, StepCard, ReadinessScore, LoadingScreen, EVMSimulator, HomeScreen)
Why: mandatory tool, AI-assisted development

## 4. Google Calendar Integration
File: src/utils/calendar.js
Method: Google Calendar deep link with pre-filled data (title, description, location based on user's state)
Why: real utility — users can actually schedule their voting day reminder

## 5. Web Speech API (Google Chrome TTS)
File: src/utils/tts.js
Languages: en-IN (English) and hi-IN (Hindi)
Where: every step card has a Listen button
Why: accessibility — users can hear their plan read aloud in their preferred language
