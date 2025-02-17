import { ISendEmailRequest } from "./IEmailRequest";
import { WelcomeEmailTemplate } from "./templates/welcomeEmail.template";

export class EmailTemplates {
    static welcome = new WelcomeEmailTemplate();
}

export interface IEmailTemplate<T> {
    hydrate(args: T): ISendEmailRequest;
}
