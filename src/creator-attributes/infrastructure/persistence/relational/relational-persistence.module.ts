import { Module } from '@nestjs/common';
import { CreatorAttributesRepository } from '../creator-attributes.repository';
import { CreatorAttributesRelationalRepository } from './repositories/creator-attributes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreatorAttributesEntity } from './entities/creator-attributes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreatorAttributesEntity])],
  providers: [
    {
      provide: CreatorAttributesRepository,
      useClass: CreatorAttributesRelationalRepository,
    },
  ],
  exports: [CreatorAttributesRepository],
})
export class RelationalCreatorAttributesPersistenceModule {}
