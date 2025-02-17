import { BaseEmailTemplateArgs, ISendEmailRequest } from "../IEmailRequest";
import { IEmailTemplate } from "../IEmailTemplates";


export interface WelcomeEmailArgs extends BaseEmailTemplateArgs {
    name: string;
}

export class WelcomeEmailTemplate implements IEmailTemplate<WelcomeEmailArgs> {
    hydrate(args: WelcomeEmailArgs): ISendEmailRequest {
        return {

            to: args.to,
            subject: `Welcome to the platform ${args.name}`,
            htmlBody: `Welcome ${args.name}, to the platform. We are excited to have you on board`,
        };
    }
}
