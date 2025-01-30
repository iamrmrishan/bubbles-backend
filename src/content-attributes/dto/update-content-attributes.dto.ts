// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateContentAttributesDto } from './create-content-attributes.dto';

export class UpdateContentAttributesDto extends PartialType(
  CreateContentAttributesDto,
) {}
