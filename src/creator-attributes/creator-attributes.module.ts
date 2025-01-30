import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { CreatorAttributesService } from './creator-attributes.service';
import { CreatorAttributesController } from './creator-attributes.controller';
import { RelationalCreatorAttributesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    RelationalCreatorAttributesPersistenceModule,
  ],
  controllers: [CreatorAttributesController],
  providers: [CreatorAttributesService],
  exports: [
    CreatorAttributesService,
    RelationalCreatorAttributesPersistenceModule,
  ],
})
export class CreatorAttributesModule {}
