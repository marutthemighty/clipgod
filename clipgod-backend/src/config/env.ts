import { createClient } from '@supabase/supabase-js';
import { Queue, Worker } from 'bullmq';
import { config } from 'dotenv';

config();

export const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export const redisConnection = { host: process.env.UPSTASH_REDIS_HOST, port: parseInt(process.env.UPSTASH_REDIS_PORT!), password: process.env.UPSTASH_REDIS_PASSWORD };

export const generateQueue = new Queue('generate', { connection: redisConnection });
