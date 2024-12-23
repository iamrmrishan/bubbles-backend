import { FilesModule } from '../files/files.module';
import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { ContentReportsService } from './content-reports.service';
import { ContentReportsController } from './content-reports.controller';
import { RelationalContentReportPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    FilesModule,

    UsersModule,

    // import modules, etc.
    RelationalContentReportPersistenceModule,
  ],
  controllers: [ContentReportsController],
  providers: [ContentReportsService],
  exports: [ContentReportsService, RelationalContentReportPersistenceModule],
})
export class ContentReportsModule {}
