import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mailAdapte";

// enviando email com mailtrap com nodemailer
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dfa029328cf7e3",
      pass: "ff7115c8704bb9"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        //enviando email para o ambiente de dev
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Alisson Oliveira <alisson_oliveira_11@hotmail.com>',
            subject,
            html: body,
        });
    };
}