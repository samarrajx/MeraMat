let currentUtterance = null

export function speak(text, language) {
  if (!window.speechSynthesis) return
  stopSpeaking()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN'
  utterance.rate = 0.9
  utterance.pitch = 1
  currentUtterance = utterance
  window.speechSynthesis.speak(utterance)
}

export function stopSpeaking() {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
  currentUtterance = null
}

export function isSpeechSupported() {
  return 'speechSynthesis' in window
}
