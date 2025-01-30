// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionsDto } from './create-subscriptions.dto';

export class UpdateSubscriptionsDto extends PartialType(
  CreateSubscriptionsDto,
) {}
