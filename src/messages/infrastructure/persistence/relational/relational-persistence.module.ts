import { Module } from '@nestjs/common';
import { MessagesRepository } from '../messages.repository';
import { MessagesRelationalRepository } from './repositories/messages.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesEntity } from './entities/messages.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MessagesEntity])],
  providers: [
    {
      provide: MessagesRepository,
      useClass: MessagesRelationalRepository,
    },
  ],
  exports: [MessagesRepository],
})
export class RelationalMessagesPersistenceModule {}
