import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { RelationalContentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [UsersModule, FilesModule, RelationalContentPersistenceModule],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService, RelationalContentPersistenceModule],
})
export class ContentsModule {}
