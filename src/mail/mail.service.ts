import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';

import { MaybeType } from '../utils/types/maybe.type';
import { MailerService } from '../mailer/mailer.service';
import { SesMailerService } from '../mailer/ses-mailer.service';
import path from 'path';
import { AllConfigType } from '../config/config.type';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly sesMailerService: SesMailerService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  private async renderTemplate(
    templatePath: string,
    context: Record<string, unknown>,
  ): Promise<string> {
    const template = await fs.readFile(templatePath, 'utf-8');
    return Handlebars.compile(template, {
      strict: true,
    })(context);
  }

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/confirm-email',
    );
    url.searchParams.set('hash', mailData.data.hash);

    const templatePath = path.join(
      this.configService.getOrThrow('app.workingDirectory', {
        infer: true,
      }),
      'src',
      'mail',
      'mail-templates',
      'activation.hbs',
    );

    const context = {
      title: emailConfirmTitle,
      url: url.toString(),
      actionTitle: emailConfirmTitle,
      app_name: this.configService.get('app.name', { infer: true }),
      text1,
      text2,
      text3,
    };

    // Render the template first
    const html = await this.renderTemplate(templatePath, context);

    // Determine which mail service to use based on the configuration
    const mailProvider = this.configService.get('mail.provider', {
      infer: true,
    });

    if (mailProvider === 'ses') {
      await this.sesMailerService.sendMail({
        to: mailData.to,
        subject: emailConfirmTitle as any,
        text: `${url.toString()} ${emailConfirmTitle}`,
        html,
      });
    } else {
      // Default to SMTP
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: emailConfirmTitle,
        text: `${url.toString()} ${emailConfirmTitle}`,
        templatePath,
        context,
      });
    }
  }

  async forgotPassword(
    mailData: MailData<{ hash: string; tokenExpires: number }>,
  ): Promise<void> {
    const i18n = I18nContext.current();
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.resetPassword'),
        i18n.t('reset-password.text1'),
        i18n.t('reset-password.text2'),
        i18n.t('reset-password.text3'),
        i18n.t('reset-password.text4'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/password-change',
    );
    url.searchParams.set('hash', mailData.data.hash);
    url.searchParams.set('expires', mailData.data.tokenExpires.toString());

    const templatePath = path.join(
      this.configService.getOrThrow('app.workingDirectory', {
        infer: true,
      }),
      'src',
      'mail',
      'mail-templates',
      'reset-password.hbs',
    );

    const context = {
      title: resetPasswordTitle,
      url: url.toString(),
      actionTitle: resetPasswordTitle,
      app_name: this.configService.get('app.name', {
        infer: true,
      }),
      text1,
      text2,
      text3,
      text4,
    };

    // Render the template first
    const html = await this.renderTemplate(templatePath, context);

    // Determine which mail service to use based on the configuration
    const mailProvider = this.configService.get('mail.provider', {
      infer: true,
    });

    if (mailProvider === 'ses') {
      await this.sesMailerService.sendMail({
        to: mailData.to,
        subject: resetPasswordTitle as any,
        text: `${url.toString()} ${resetPasswordTitle}`,
        html,
      });
    } else {
      // Default to SMTP
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: resetPasswordTitle,
        text: `${url.toString()} ${resetPasswordTitle}`,
        templatePath,
        context,
      });
    }
  }

  async confirmNewEmail(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-new-email.text1'),
        i18n.t('confirm-new-email.text2'),
        i18n.t('confirm-new-email.text3'),
      ]);
    }

    const url = new URL(
      this.configService.getOrThrow('app.frontendDomain', {
        infer: true,
      }) + '/confirm-new-email',
    );
    url.searchParams.set('hash', mailData.data.hash);

    const templatePath = path.join(
      this.configService.getOrThrow('app.workingDirectory', {
        infer: true,
      }),
      'src',
      'mail',
      'mail-templates',
      'confirm-new-email.hbs',
    );

    const context = {
      title: emailConfirmTitle,
      url: url.toString(),
      actionTitle: emailConfirmTitle,
      app_name: this.configService.get('app.name', { infer: true }),
      text1,
      text2,
      text3,
    };

    // Render the template first
    const html = await this.renderTemplate(templatePath, context);

    // Determine which mail service to use based on the configuration
    const mailProvider = this.configService.get('mail.provider', {
      infer: true,
    });

    if (mailProvider === 'ses') {
      await this.sesMailerService.sendMail({
        to: mailData.to,
        subject: emailConfirmTitle as any,
        text: `${url.toString()} ${emailConfirmTitle}`,
        html,
      });
    } else {
      // Default to SMTP
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: emailConfirmTitle,
        text: `${url.toString()} ${emailConfirmTitle}`,
        templatePath,
        context,
      });
    }
  }
}
