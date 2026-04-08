import { readdirSync, readFileSync } from 'fs'
import { join, basename, extname } from 'path'
import { createHash } from 'crypto'

const CLOUD_NAME = 'dc7kinqks'
const API_KEY = '315755639268591'
const API_SECRET = 'LH5AWadDlNHq_GHkjYM8Fep-8co'

function sign(params) {
  const sorted = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&')
  return createHash('sha256').update(sorted + API_SECRET).digest('hex')
}

const uploadsDir = join(process.cwd(), 'src/assets/uploads')
const files = readdirSync(uploadsDir)

for (const file of files) {
  const filePath = join(uploadsDir, file)
  const ext = extname(file)
  const nameWithoutExt = basename(file, ext)
  const publicId = `precision-works/${nameWithoutExt}`

  const timestamp = Math.floor(Date.now() / 1000)
  const paramsToSign = { overwrite: 'true', public_id: publicId, timestamp }
  const signature = sign(paramsToSign)

  const fileBuffer = readFileSync(filePath)
  const blob = new Blob([fileBuffer])

  const form = new FormData()
  form.append('file', blob, file)
  form.append('public_id', publicId)
  form.append('overwrite', 'true')
  form.append('timestamp', String(timestamp))
  form.append('api_key', API_KEY)
  form.append('signature', signature)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: form,
    })
    const data = await res.json()
    if (data.secure_url) {
      console.log(`✓ ${file}\n  → ${data.secure_url}`)
    } else {
      console.error(`✗ ${file}: ${JSON.stringify(data.error ?? data)}`)
    }
  } catch (err) {
    console.error(`✗ ${file}: ${err.message}`)
  }
}
