import { Module } from '@nestjs/common';
import { SearchPreferencesRepository } from '../search-preferences.repository';
import { SearchPreferencesRelationalRepository } from './repositories/search-preferences.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchPreferencesEntity } from './entities/search-preferences.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SearchPreferencesEntity])],
  providers: [
    {
      provide: SearchPreferencesRepository,
      useClass: SearchPreferencesRelationalRepository,
    },
  ],
  exports: [SearchPreferencesRepository],
})
export class RelationalSearchPreferencesPersistenceModule {}
