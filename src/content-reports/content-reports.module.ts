import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { ContentReportsService } from './content-reports.service';
import { ContentReportsController } from './content-reports.controller';
import { RelationalContentReportPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { ContentsModule } from '../contents/contents.module';

@Module({
  imports: [
    ContentsModule,

    UsersModule,

    // import modules, etc.
    RelationalContentReportPersistenceModule,
  ],
  controllers: [ContentReportsController],
  providers: [ContentReportsService],
  exports: [ContentReportsService, RelationalContentReportPersistenceModule],
})
export class ContentReportsModule {}
