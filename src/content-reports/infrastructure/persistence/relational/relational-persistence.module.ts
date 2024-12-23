import { Module } from '@nestjs/common';
import { ContentReportRepository } from '../content-report.repository';
import { ContentReportRelationalRepository } from './repositories/content-report.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentReportEntity } from './entities/content-report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentReportEntity])],
  providers: [
    {
      provide: ContentReportRepository,
      useClass: ContentReportRelationalRepository,
    },
  ],
  exports: [ContentReportRepository],
})
export class RelationalContentReportPersistenceModule {}
