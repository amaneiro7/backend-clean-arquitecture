import { createClient } from 'redis'
import { config } from '../../../../../../config/env.file'

const redisClient = createClient()

redisClient.on('error', err => console.log('Redis Client Error', err))

await redisClient.connect()