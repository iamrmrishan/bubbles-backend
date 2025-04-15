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
    this.sesClient = new SESClient({
      region: configService.get('mail.awsRegion', { infer: true }),
      credentials: {
        accessKeyId: configService.get('mail.accessKeyId', { infer: true }),
        secretAccessKey: configService.get('mail.secretAccessKey', {
          infer: true,
        }),
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

    // If a template was provided, we'll ignore it since SES has its own templates
    // But we'll keep this logic for compatibility with the previous implementation
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
