import { Module } from '@nestjs/common';
import { UserBlocksRepository } from '../user-blocks.repository';
import { UserBlocksRelationalRepository } from './repositories/user-blocks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBlocksEntity } from './entities/user-blocks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBlocksEntity])],
  providers: [
    {
      provide: UserBlocksRepository,
      useClass: UserBlocksRelationalRepository,
    },
  ],
  exports: [UserBlocksRepository],
})
export class RelationalUserBlocksPersistenceModule {}
