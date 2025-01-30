// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionPlansDto } from './create-subscription-plans.dto';

export class UpdateSubscriptionPlansDto extends PartialType(
  CreateSubscriptionPlansDto,
) {}
