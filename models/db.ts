import {Pool} from 'pg'
import dotenv from 'dotenv';
dotenv.config();


const pool = new Pool({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT?parseInt(process.env.DATABASE_PORT):undefined
})
export default pool;