import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerModule } from '../mailer/mailer.module';
import { SesMailerService } from '../mailer/ses-mailer.service';

@Module({
  imports: [ConfigModule, MailerModule],
  providers: [MailService, SesMailerService],
  exports: [MailService],
})
export class MailModule {}
