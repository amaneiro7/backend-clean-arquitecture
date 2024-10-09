import { createClient, RedisClientType } from 'redis'
import { CacheRepository } from '../../../domain/CacheRepository'
import { config } from '../../../../../../config/env.file'
export class RedisRepository implements CacheRepository {

    private readonly client: RedisClientType = createClient({
        password: config.redis.password,
        socket: {
            host: config.redis.host,
            port: config.redis.port
        }
    })

    constructor() {
        this.client.on('error', (err) => console.error('Redis Client Error', err))

        this.init()
    }

    private async init() {
        try {
            await this.client.connect()
            console.log('Connected to Redis')
        } catch (error) {
            console.error('Error connecting to Redis', error)
        }
    }

    async get(key: string): Promise<string | null> {
        const value = await this.client.get(key)
        return value
    }

    async set(key: string, value: string): Promise<void> {
        await this.client.set(key, value)
    }
    async del(key: string): Promise<void> {
        await this.client.del(key)
    }

    async close(): Promise<void> {
        await this.client.disconnect();
    }
}