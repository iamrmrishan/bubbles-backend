import { forwardRef, Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { RelationalPaymentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { WalletsModule } from '../wallets/wallets.module';
import { StripeModule } from '../stripes/stripes.module';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';

@Module({
  imports: [
    // import modules, etc.
    RelationalPaymentPersistenceModule,
    forwardRef(() => WalletsModule),
    StripeModule,
    ConfigModule,
    forwardRef(() => SubscriptionPlansModule),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService, RelationalPaymentPersistenceModule],
})
export class PaymentsModule {}
