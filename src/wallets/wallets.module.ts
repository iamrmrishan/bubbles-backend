import { forwardRef, Module } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletsController } from './wallets.controller';
import { RelationalWalletPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { UsersModule } from '../users/users.module';
import { StripeModule } from '../stripes/stripes.module';
import { VerificationsModule } from '../verifications/verifications.module';
import { PaymentsModule } from '../payments/payments.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalWalletPersistenceModule,
    StripeModule,
    UsersModule,
    VerificationsModule,
    forwardRef(() => PaymentsModule),
  ],
  controllers: [WalletsController],
  providers: [WalletsService],
  exports: [WalletsService, RelationalWalletPersistenceModule],
})
export class WalletsModule {}
