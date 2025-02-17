export interface BaseEmailTemplateArgs {
    to: string;
}

export interface ISendEmailRequest {
    from?: string;
    to: string;
    subject: string;
    htmlBody: string | undefined;
    textBody?: string | undefined;
    retryCount?: number;
}