import { Module } from '@nestjs/common';
import { ContentRepository } from '../content.repository';
import { ContentRelationalRepository } from './repositories/content.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntity } from './entities/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntity])],
  providers: [
    {
      provide: ContentRepository,
      useClass: ContentRelationalRepository,
    },
  ],
  exports: [ContentRepository],
})
export class RelationalContentPersistenceModule {}
