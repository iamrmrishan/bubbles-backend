// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateVerificationsDto } from './create-verifications.dto';

export class UpdateVerificationsDto extends PartialType(
  CreateVerificationsDto,
) {}
