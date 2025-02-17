import { config as configDotenv } from "dotenv";

configDotenv();

interface ENV {
    CLIENT_FRONTEND_URL: string | undefined;
    ALLOWED_CLIENT_URLS: string | undefined;
    PORT: number | undefined;

    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_RESET_PASSWORD_SECRET: string;
    JWT_REGISTRATION_SECRET: string;

    SMTP_HOST: string | undefined;
    SMTP_PORT: number | undefined;
    SMTP_USER: string | undefined;
    SMTP_PASSWORD: string | undefined;
    SMTP_SECURE: boolean;

    NODE_ENV: string | undefined;
    SEED_ADMIN_USERNAME: string | undefined;
    SEED_ADMIN_PASSWORD: string | undefined;

    CACHE_DB_HOST: string | undefined;
    CACHE_DB_PORT: number | undefined;
    CACHE_DB_PASSWORD: string | undefined;

    MONGODB_CONNECTION_STRING: string;
}

const getConfig = (): ENV => {
    return {
        CLIENT_FRONTEND_URL: process.env.CLIENT_FRONTEND_URL,
        ALLOWED_CLIENT_URLS: process.env.ALLOWED_CLIENT_URLS || undefined,
        PORT: process.env.PORT ? parseInt(process.env.PORT) : undefined,

        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
        JWT_RESET_PASSWORD_SECRET: process.env.JWT_RESET_PASSWORD_SECRET!,
        JWT_REGISTRATION_SECRET: process.env.JWT_REGISTRATION_SECRET!,

        SMTP_HOST: process.env.SMTP_HOST!,
        SMTP_PORT: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
        SMTP_USER: process.env.SMTP_USER || undefined,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD || undefined,
        SMTP_SECURE: process.env.SMTP_SECURE === "true",

        NODE_ENV: process.env.NODE_ENV || undefined,
        SEED_ADMIN_USERNAME: process.env.SEED_ADMIN_USERNAME || undefined,
        SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD || undefined,

        CACHE_DB_HOST: process.env.CACHE_DB_HOST || undefined,
        CACHE_DB_PORT: process.env.CACHE_DB_PORT ? parseInt(process.env.CACHE_DB_PORT) : undefined,
        CACHE_DB_PASSWORD: process.env.CACHE_DB_PASSWORD || undefined,

        MONGODB_CONNECTION_STRING: process.env.MONGODB_CONNECTION_STRING!,
    };
}

export default getConfig();