import { Injectable } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailSenderService {
  transporter: Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'vicka.kudryavtseva@yandex.ru',
        pass: '',
      },
    });
  }

  async sendEmail() {
    await this.transporter.sendMail({
      from: '"Node js" <vicka.kudryavtseva@yandex.ru>',
      to: 'vasua14735@icloud.com',
      subject: 'Message from Node js',
      text: 'This message was sent from Node js server.',
      html: 'This <i>message</i> was sent from <strong>Node js</strong> server.',
    });
  }
}
