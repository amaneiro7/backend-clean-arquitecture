export class CachetService {
    private readonly cache: Map<string, any>

    constructor() {
        this.cache = new Map()
    }

    set(key: string, value: any) {
        this.cache.set(key, value)
    }

    get(key: string) {
        return this.cache.get(key)
    }
}