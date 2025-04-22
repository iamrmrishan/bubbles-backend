import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { forwardRef, Module } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';
import { RelationalContentPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ContentAttributesModule } from '../content-attributes/content-attributes.module';

@Module({
  imports: [
    UsersModule,
    FilesModule,
    RelationalContentPersistenceModule,
    forwardRef(() => ContentAttributesModule), // 👈 this fixes the loop
  ],
  controllers: [ContentsController],
  providers: [ContentsService],
  exports: [ContentsService, RelationalContentPersistenceModule],
})
export class ContentsModule {}
