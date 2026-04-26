import DOMPurify from 'dompurify'

export function sanitizeInput(text) {
  if (!text || typeof text !== 'string') return ''
  const clean = DOMPurify.sanitize(text, { ALLOWED_TAGS: [] })
  return clean.trim().slice(0, 500)
}
