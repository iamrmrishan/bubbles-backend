import { Module } from '@nestjs/common';
import { ContentAttributesRepository } from '../content-attributes.repository';
import { ContentAttributesRelationalRepository } from './repositories/content-attributes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentAttributesEntity } from './entities/content-attributes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentAttributesEntity])],
  providers: [
    {
      provide: ContentAttributesRepository,
      useClass: ContentAttributesRelationalRepository,
    },
  ],
  exports: [ContentAttributesRepository],
})
export class RelationalContentAttributesPersistenceModule {}
