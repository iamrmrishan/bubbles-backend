// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateStripeDto } from './create-stripe.dto';

export class UpdateStripeDto extends PartialType(CreateStripeDto) {}
