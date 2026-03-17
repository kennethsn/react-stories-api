/**
 * Simple LRU (Least Recently Used) cache implementation with optional TTL support
 */
export class LRUCache<K extends string, V> {
  private cache: Map<K, { value: V; timestamp: number }>;

  private keyOrder: K[] = [];

  private maxSize: number;

  private ttl: number | null;

  constructor(maxSize: number = Infinity, ttlMs: number | null = null) {
    this.cache = new Map();
    this.maxSize = maxSize;
    this.ttl = ttlMs;
  }

  get(key: K): V | undefined {
    const entry = this.cache.get(key);
    if (!entry) {
      return undefined;
    }

    // Check if entry has expired
    if (this.ttl !== null && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      this.keyOrder = this.keyOrder.filter((k) => k !== key);
      return undefined;
    }

    // Move to end (most recently used)
    this.keyOrder = this.keyOrder.filter((k) => k !== key);
    this.keyOrder.push(key);

    return entry.value;
  }

  set(key: K, value: V): void {
    // Remove if already exists
    if (this.cache.has(key)) {
      this.keyOrder = this.keyOrder.filter((k) => k !== key);
    } else if (this.keyOrder.length >= this.maxSize && this.maxSize !== Infinity) {
      // Evict least recently used
      const lruKey = this.keyOrder.shift();
      if (lruKey) {
        this.cache.delete(lruKey);
      }
    }

    this.cache.set(key, {
      timestamp: Date.now(),
      value,
    });
    this.keyOrder.push(key);
  }

  clear(): void {
    this.cache.clear();
    this.keyOrder = [];
  }

  has(key: K): boolean {
    if (!this.cache.has(key)) {
      return false;
    }

    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    // Check if entry has expired
    if (this.ttl !== null && Date.now() - entry.timestamp > this.ttl) {
      this.cache.delete(key);
      this.keyOrder = this.keyOrder.filter((k) => k !== key);
      return false;
    }

    return true;
  }
}

export default LRUCache;
