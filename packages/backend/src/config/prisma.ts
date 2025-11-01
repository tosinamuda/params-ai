import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config()
// neonConfig.webSocketConstructor = ws
// const connectionString = `${process.env.DATABASE_URL}`

// const pool = new Pool({ connectionString })
// const adapter = new PrismaNeon(pool)
//const prisma = new PrismaClient({ adapter })
const prisma = new PrismaClient()
export default prisma;

