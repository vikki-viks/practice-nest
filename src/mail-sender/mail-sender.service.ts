import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailSenderService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'vicka.kudryavtseva@yandex.ru',
        pass: this.configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail({
    userMail,
    subject,
    text,
  }: {
    userMail: string;
    subject: string;
    text: string;
  }) {
    await this.transporter.sendMail({
      from: '"Node js" <vicka.kudryavtseva@yandex.ru>',
      to: userMail,
      subject,
      text,
    });
  }
}
