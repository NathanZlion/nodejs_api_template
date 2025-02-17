import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "@/config";
import { UserPayload } from "../hashedPayloadTypes";


export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const compareHash = async (plainText: string, hash: string): Promise<boolean> => {
    const match = await bcrypt.compare(plainText, hash);
    return match;
};

export const generateToken = (
    user: UserPayload,
    expiresIn: string | number | undefined,
    secret: string
): string => {
    return jwt.sign(user, secret, { expiresIn: expiresIn });
}

export const generateRegistrationToken = (user: UserPayload): string => {
    return generateToken(user, "1h", config.JWT_REGISTRATION_SECRET);
}

export const decodeUserFromToken = (token: string): UserPayload => {
    return jwt.verify(token, config.JWT_ACCESS_SECRET) as UserPayload;
}

export const generateAccessToken = (user: UserPayload): string => {
    return generateToken(user, "7d", config.JWT_ACCESS_SECRET);
}
