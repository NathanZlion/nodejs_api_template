import { inject, injectable } from "inversify"
import { ISendEmailRequest } from "./IEmailRequest"
import { IEmailResponse } from "./IEmailResponse"
import config from "@/config"
import { Options as MailOptions } from "nodemailer/lib/mailer"
import { Types } from "@/di/types"
import MailTransporter from "./mailTransporter"
import { SentMessageInfo, Transporter } from "nodemailer"
import { IEmailTemplate } from "./IEmailTemplates"
import { logger } from "@/core/utils/logger"
import { InternalServerError } from "@/core/constants/errors"


@injectable()
export default class EmailService {
    constructor(
        @inject(Types.MailTransporter)
        private mailTransporter: MailTransporter
    ) {
    }

    sendEmail = async ({
        to,
        subject,
        htmlBody,
        textBody,
        from,
        retryCount = 3
    }: ISendEmailRequest): Promise<IEmailResponse> => {

        const mailOptions: MailOptions = {
            from: config.SMTP_USER || from,
            to,
            subject,
            html: htmlBody,
            text: textBody,
        }

        try {
            const {
                success,
                message,
                retryCount: numberOfRetries,
            } = await this.sendEmailWithRetry(this.mailTransporter.transporter, mailOptions, retryCount)

            if (!success) {
                throw new InternalServerError(`Failed to send email : ${message}`);
            }

            return {
                success: true,
                message: `Email sent successfully : ${message}`,
                retryCount: retryCount - numberOfRetries,
            }
        }
        // catch errors of type Error
        catch (error) {
            return {
                success: false,
                message: (error as Error).message || "Failed to send email",
                retryCount: retryCount,
            }
        }
    }

    sendEmailFromTemplate = async <T>(template: IEmailTemplate<T>, args: T): Promise<IEmailResponse> => {
        const emailRequest = template.hydrate(args);
        return this.sendEmail(emailRequest);
    }

    sendEmailWithRetry = async (
        transporter: Transporter<SentMessageInfo>,
        mailOptions: MailOptions,
        remainingRetryCount: number,
    ): Promise<IEmailResponse> => {
        try {
            const info = await new Promise<SentMessageInfo>((resolve, reject) => {
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(info);
                    }
                });
            });

            logger.info(`Email sent successfully with ${remainingRetryCount} try remaining : Message Id ${info.messageId}`);

            return {
                success: true,
                message: `Email sent successfully : Message Id ${info.messageId}`,
                retryCount: 0,
            };
        } catch (error) {
            if (remainingRetryCount > 0) {
                logger.warn(`Retrying email (remaining retries: ${remainingRetryCount - 1})`);
                await new Promise(resolve => setTimeout(resolve, 1000));

                // retry sending email
                return this.sendEmailWithRetry(transporter, mailOptions, remainingRetryCount - 1);
            } else {
                logger.error(`Failed to send email: ${(error as Error).message}`);
                throw new Error("Max retries reached. Email failed.");
            }
        }
    }

    // ping method to check if the email service is running
    ping = async (): Promise<boolean> => {
        try {
            return await this.mailTransporter.transporter.verify();
        } catch (error) {
            logger.error(`Error in pinging email service: ${(error as Error).message}`);
            return false;
        }
    }
}
