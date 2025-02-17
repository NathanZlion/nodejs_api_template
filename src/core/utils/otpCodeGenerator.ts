import { randomInt } from 'crypto';


export const generateOTP = (length: number = 4): string => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;

    return randomInt(min, max).toString();
}
