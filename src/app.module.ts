import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import googleConfig from './auth-google/config/google.config';
import twitterConfig from './auth-twitter/config/twitter.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { AuthTwitterModule } from './auth-twitter/auth-twitter.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { UserBlocksModule } from './user-blocks/user-blocks.module';

import { ContentReportsModule } from './content-reports/content-reports.module';

import { ContentsModule } from './contents/contents.module';

import { CreatorAttributesModule } from './creator-attributes/creator-attributes.module';

import { ContentAttributesModule } from './content-attributes/content-attributes.module';

import { SearchPreferencesModule } from './search-preferences/search-preferences.module';

import { SubscriptionPlansModule } from './subscription-plans/subscription-plans.module';

import { SubscriptionsModule } from './subscriptions/subscriptions.module';

import { MessagesModule } from './messages/messages.module';

import { VerificationsModule } from './verifications/verifications.module';

import { PaymentsModule } from './payments/payments.module';

import { WalletsModule } from './wallets/wallets.module';

import { StripeModule } from './stripes/stripes.module';

@Module({
  imports: [
    StripeModule,
    WalletsModule,
    PaymentsModule,
    VerificationsModule,
    MessagesModule,
    SubscriptionsModule,
    SubscriptionPlansModule,
    SearchPreferencesModule,
    ContentAttributesModule,
    CreatorAttributesModule,
    ContentsModule,
    ContentReportsModule,
    UserBlocksModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
        twitterConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthGoogleModule,
    AuthTwitterModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
