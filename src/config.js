import { config } from 'dotenv'
config()

export const MongoDB = process.env.MONGO_URI
export const PORT = process.env.PORT || 3000