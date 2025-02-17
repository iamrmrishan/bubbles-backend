import { Module } from '@nestjs/common';
import { StripeRepository } from '../stripe.repository';
import { StripeRelationalRepository } from './repositories/stripe.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeEntity } from './entities/stripe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StripeEntity])],
  providers: [
    {
      provide: StripeRepository,
      useClass: StripeRelationalRepository,
    },
  ],
  exports: [StripeRepository],
})
export class RelationalStripePersistenceModule {}
