import { SubscriptionPlansModule } from '../subscription-plans/subscription-plans.module';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { RelationalMessagesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SubscriptionPlansModule,

    UsersModule,

    // import modules, etc.
    RelationalMessagesPersistenceModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
  exports: [MessagesService, RelationalMessagesPersistenceModule],
})
export class MessagesModule {}
