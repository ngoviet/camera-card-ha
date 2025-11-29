/**
 * Native JavaScript alternatives to lodash functions.
 * These are lightweight replacements for commonly used lodash functions
 * to reduce bundle size.
 */

/**
 * Deep equality check - lightweight alternative to lodash isEqual
 * Note: This is a simplified version. For complex cases, lodash may still be needed.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i])) return false;
      }
      return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
        return false;
      }
    }
    return true;
  }

  return false;
}

/**
 * Deep clone - lightweight alternative to lodash cloneDeep
 * Note: This doesn't handle all edge cases (functions, dates, etc.)
 * For complex cases, consider using structuredClone or lodash.
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as unknown as T;
  if (typeof obj === 'object') {
    const cloned = {} as T;
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        (cloned as Record<string, unknown>)[key] = deepClone((obj as Record<string, unknown>)[key]);
      }
    }
    return cloned;
  }
  return obj;
}

/**
 * Deep merge - lightweight alternative to lodash merge
 * Merges source objects into target object.
 */
export function deepMerge<T extends Record<string, unknown>>(
  target: T,
  ...sources: Array<Partial<T> | undefined>
): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (source) {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        const sourceValue = source[key];
        const targetValue = target[key];

        if (
          sourceValue &&
          typeof sourceValue === 'object' &&
          !Array.isArray(sourceValue) &&
          targetValue &&
          typeof targetValue === 'object' &&
          !Array.isArray(targetValue)
        ) {
          target[key] = deepMerge({ ...targetValue } as T, sourceValue as Partial<T>) as T[Extract<
            keyof T,
            string
          >];
        } else {
          target[key] = sourceValue as T[Extract<keyof T, string>];
        }
      }
    }
  }

  return deepMerge(target, ...sources);
}

/**
 * Clamp value between min and max - alternative to lodash clamp
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Round number to specified precision - alternative to lodash round
 */
export function round(value: number, precision = 0): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
}

/**
 * Get unique array items - alternative to lodash uniq
 */
export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Get unique array items by key - alternative to lodash uniqBy
 */
export function uniqBy<T>(array: T[], iteratee: (item: T) => unknown): T[] {
  const seen = new Set<unknown>();
  return array.filter((item) => {
    const key = iteratee(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Get unique array items with custom equality - alternative to lodash uniqWith
 */
export function uniqWith<T>(array: T[], comparator: (a: T, b: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of array) {
    if (!result.some((existing) => comparator(existing, item))) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Get unique array items from a sorted array by key - alternative to lodash sortedUniqBy
 * More efficient than uniqBy for already-sorted arrays as it only checks adjacent items.
 */
export function sortedUniqBy<T>(array: T[], iteratee: (item: T) => unknown): T[] {
  if (array.length === 0) return [];
  const result: T[] = [array[0]];
  let lastKey = iteratee(array[0]);
  for (let i = 1; i < array.length; i++) {
    const key = iteratee(array[i]);
    if (key !== lastKey) {
      result.push(array[i]);
      lastKey = key;
    }
  }
  return result;
}

