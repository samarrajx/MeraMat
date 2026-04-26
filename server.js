import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 8080

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://maps.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com; " +
    "font-src https://fonts.gstatic.com; " +
    "connect-src 'self' https://generativelanguage.googleapis.com https://translation.googleapis.com https://maps.googleapis.com; " +
    "img-src 'self' data: https://maps.gstatic.com https://maps.googleapis.com https://*.googleapis.com; " +
    "frame-src https://calendar.google.com https://www.google.com https://www.google.com/maps/"
  )
  next()
})

app.use(express.static(path.join(__dirname, 'dist')))

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, () =>
  console.log(`MeraMat running on port ${PORT}`)
)
