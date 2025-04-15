import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerService } from './mailer.service';
import { SesMailerService } from './ses-mailer.service';

@Module({
  imports: [ConfigModule],
  providers: [MailerService, SesMailerService],
  exports: [MailerService, SesMailerService],
})
export class MailerModule {}
