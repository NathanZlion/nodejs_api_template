import config from "@/config";
import { injectable } from "inversify";
import { createTransport as createMailTransport, SentMessageInfo, Transporter } from "nodemailer";

@injectable()
export default class MailTransporter {
    private readonly _transporter: Transporter<SentMessageInfo>;

    constructor() {
        this._transporter = createMailTransport(
            {
                host: config.SMTP_HOST,
                secure: config.SMTP_SECURE,
                port: config.SMTP_PORT,
                auth: {
                    user: config.SMTP_USER,
                    pass: config.SMTP_PASSWORD,
                }
            }
        )
    }

    get transporter() {
        return this._transporter;
    }
}

