/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SESClient,
  SendEmailCommand,
  SendEmailCommandInput,
} from '@aws-sdk/client-ses';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class SesMailerService {
  private readonly sesClient: SESClient;

  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const accessKeyId = this.configService.get('mail.accessKeyId', {
      infer: true,
    });
    const secretAccessKey = this.configService.get('mail.secretAccessKey', {
      infer: true,
    });
    const region = this.configService.get('mail.awsRegion', { infer: true });

    if (!accessKeyId || !secretAccessKey || !region) {
      throw new Error(
        'AWS SES credentials or region are not properly configured',
      );
    }

    this.sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: {
    from?: string;
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    templatePath?: string;
    context?: Record<string, unknown>;
  }): Promise<void> {
    let html: string | undefined = mailOptions.html;

    // Convert plain text to HTML if needed
    if (!html && mailOptions.text) {
      html = `<pre>${mailOptions.text}</pre>`;
    }

    const toAddresses = Array.isArray(mailOptions.to)
      ? mailOptions.to
      : [mailOptions.to];

    const params: SendEmailCommandInput = {
      Source:
        mailOptions.from ||
        `"${this.configService.get('mail.defaultName', {
          infer: true,
        })}" <${this.configService.get('mail.defaultEmail', {
          infer: true,
        })}>`,
      Destination: {
        ToAddresses: toAddresses,
      },
      Message: {
        Subject: {
          Data: mailOptions.subject,
          Charset: 'UTF-8',
        },
        Body: {
          ...(html
            ? {
                Html: {
                  Data: html,
                  Charset: 'UTF-8',
                },
              }
            : {}),
          ...(mailOptions.text
            ? {
                Text: {
                  Data: mailOptions.text,
                  Charset: 'UTF-8',
                },
              }
            : {}),
        },
      },
    };

    try {
      await this.sesClient.send(new SendEmailCommand(params));
    } catch (error) {
      console.error('Error sending email via SES:', error);
      throw error;
    }
  }
}
