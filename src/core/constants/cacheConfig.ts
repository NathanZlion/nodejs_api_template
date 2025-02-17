
export const cachePrefix = {
    OTP: "OTP",
    EMAIL: "EMAIL",
} as const;

export const cacheTTL = {
    OTP: 60 * 5,
    EMAIL: 60 * 60 * 24,
}

export const cacheKeyBuilder = (prefix: keyof typeof cachePrefix, key: string) => `${prefix}:${key}`;
