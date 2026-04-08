import { Hono } from 'hono'
import { cors } from 'hono/cors'
import ghlRoute from './routes/ghl'

const app = new Hono()

app.use('/*', cors({
  origin: [
    'https://precisionworks-frontend-production.up.railway.app',
    'http://localhost:5173',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}))

app.get('/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// GHL booking + payments
app.route('/api/ghl', ghlRoute)

// Add your API routes here
// Example:
// app.get('/api/users', async (c) => {
//   const result = await db.select().from(users)
//   return c.json(result)
// })

export default {
  port: parseInt(process.env.PORT || '4000'),
  fetch: app.fetch,
}
