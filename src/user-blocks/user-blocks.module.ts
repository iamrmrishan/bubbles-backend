import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { UserBlocksService } from './user-blocks.service';
import { UserBlocksController } from './user-blocks.controller';
import { RelationalUserBlocksPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    RelationalUserBlocksPersistenceModule,
  ],
  controllers: [UserBlocksController],
  providers: [UserBlocksService],
  exports: [UserBlocksService, RelationalUserBlocksPersistenceModule],
})
export class UserBlocksModule {}
