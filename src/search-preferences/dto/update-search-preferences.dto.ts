// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSearchPreferencesDto } from './create-search-preferences.dto';

export class UpdateSearchPreferencesDto extends PartialType(
  CreateSearchPreferencesDto,
) {}
