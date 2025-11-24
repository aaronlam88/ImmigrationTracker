/**
 * AsyncStorage Wrapper Service
 * Type-safe async storage with error handling and validation
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Storage keys for the app
 */
export enum StorageKey {
  USER_PROFILE = '@immigration_tracker:user_profile',
  TIMELINE = '@immigration_tracker:timeline',
  DEADLINES = '@immigration_tracker:deadlines',
  DOCUMENTS = '@immigration_tracker:documents',
  FORMS = '@immigration_tracker:forms',
  NOTIFICATIONS_ENABLED = '@immigration_tracker:notifications_enabled',
  APP_SETTINGS = '@immigration_tracker:app_settings',
}

/**
 * Error types for storage operations
 */
export class StorageError extends Error {
  constructor(
    message: string,
    public readonly key: string,
    public readonly operation: 'get' | 'set' | 'remove' | 'clear',
    public readonly originalError?: Error
  ) {
    super(message);
    this.name = 'StorageError';
  }
}

/**
 * Generic type-safe get method
 */
export async function getItem<T>(key: StorageKey): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value === null) {
      return null;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    throw new StorageError(
      `Failed to get item with key: ${key}`,
      key,
      'get',
      error as Error
    );
  }
}

/**
 * Generic type-safe set method
 */
export async function setItem<T>(key: StorageKey, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    throw new StorageError(
      `Failed to set item with key: ${key}`,
      key,
      'set',
      error as Error
    );
  }
}

/**
 * Remove item from storage
 */
export async function removeItem(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    throw new StorageError(
      `Failed to remove item with key: ${key}`,
      key,
      'remove',
      error as Error
    );
  }
}

/**
 * Clear all app data (use with caution)
 */
export async function clearAll(): Promise<void> {
  try {
    const keys = Object.values(StorageKey);
    await AsyncStorage.multiRemove(keys);
  } catch (error) {
    throw new StorageError(
      'Failed to clear all storage',
      'ALL_KEYS',
      'clear',
      error as Error
    );
  }
}

/**
 * Check if a key exists in storage
 */
export async function hasItem(key: StorageKey): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null;
  } catch (error) {
    return false;
  }
}

/**
 * Get multiple items at once
 */
export async function getMultipleItems<T extends Record<string, unknown>>(
  keys: StorageKey[]
): Promise<Partial<T>> {
  try {
    const pairs = await AsyncStorage.multiGet(keys);
    const result: Partial<T> = {};
    
    pairs.forEach(([key, value]) => {
      if (value !== null) {
        try {
          (result as any)[key] = JSON.parse(value);
        } catch (parseError) {
          console.warn(`Failed to parse value for key: ${key}`, parseError);
        }
      }
    });
    
    return result;
  } catch (error) {
    throw new StorageError(
      `Failed to get multiple items`,
      keys.join(', '),
      'get',
      error as Error
    );
  }
}

/**
 * Set multiple items at once
 */
export async function setMultipleItems(items: Array<[StorageKey, unknown]>): Promise<void> {
  try {
    const pairs: Array<[string, string]> = items.map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    await AsyncStorage.multiSet(pairs);
  } catch (error) {
    throw new StorageError(
      `Failed to set multiple items`,
      items.map(([key]) => key).join(', '),
      'set',
      error as Error
    );
  }
}

/**
 * Get all keys currently in storage
 */
export async function getAllKeys(): Promise<readonly string[]> {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    throw new StorageError(
      'Failed to get all keys',
      'ALL_KEYS',
      'get',
      error as Error
    );
  }
}

/**
 * Merge value with existing value (shallow merge for objects)
 */
export async function mergeItem<T extends Record<string, unknown>>(
  key: StorageKey,
  value: Partial<T>
): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
  } catch (error) {
    throw new StorageError(
      `Failed to merge item with key: ${key}`,
      key,
      'set',
      error as Error
    );
  }
}

/**
 * Helper to handle dates in objects
 * Converts Date objects to ISO strings before storage
 */
export function prepareDateForStorage<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (obj instanceof Date) {
    return obj.toISOString() as unknown as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => prepareDateForStorage(item)) as unknown as T;
  }

  if (typeof obj === 'object') {
    const prepared: any = {};
    for (const [key, value] of Object.entries(obj)) {
      prepared[key] = prepareDateForStorage(value);
    }
    return prepared;
  }

  return obj;
}

/**
 * Helper to parse dates from stored objects
 * Converts ISO strings back to Date objects
 */
export function parseDateFromStorage<T>(obj: T, dateFields: string[]): T {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'object' && !Array.isArray(obj)) {
    const parsed: any = { ...obj };
    for (const field of dateFields) {
      if (parsed[field] && typeof parsed[field] === 'string') {
        const date = new Date(parsed[field]);
        if (!isNaN(date.getTime())) {
          parsed[field] = date;
        }
      }
    }
    return parsed;
  }

  return obj;
}

/**
 * Export all storage functions as a service
 */
export const AsyncStorageService = {
  getItem,
  setItem,
  removeItem,
  clearAll,
  hasItem,
  getMultipleItems,
  setMultipleItems,
  getAllKeys,
  mergeItem,
  prepareDateForStorage,
  parseDateFromStorage,
};

export default AsyncStorageService;

