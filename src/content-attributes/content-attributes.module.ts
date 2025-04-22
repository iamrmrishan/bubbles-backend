import { ContentsModule } from '../contents/contents.module';
import { forwardRef, Module } from '@nestjs/common';
import { ContentAttributesService } from './content-attributes.service';
import { ContentAttributesController } from './content-attributes.controller';
import { RelationalContentAttributesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => ContentsModule), // 👈 same fix here

    // import modules, etc.
    RelationalContentAttributesPersistenceModule,
  ],
  controllers: [ContentAttributesController],
  providers: [ContentAttributesService],
  exports: [
    ContentAttributesService,
    RelationalContentAttributesPersistenceModule,
  ],
})
export class ContentAttributesModule {}
