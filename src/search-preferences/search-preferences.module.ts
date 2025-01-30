import { UsersModule } from '../users/users.module';
import { Module } from '@nestjs/common';
import { SearchPreferencesService } from './search-preferences.service';
import { SearchPreferencesController } from './search-preferences.controller';
import { RelationalSearchPreferencesPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // import modules, etc.
    RelationalSearchPreferencesPersistenceModule,
  ],
  controllers: [SearchPreferencesController],
  providers: [SearchPreferencesService],
  exports: [
    SearchPreferencesService,
    RelationalSearchPreferencesPersistenceModule,
  ],
})
export class SearchPreferencesModule {}
