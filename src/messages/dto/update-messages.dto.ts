// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateMessagesDto } from './create-messages.dto';

export class UpdateMessagesDto extends PartialType(CreateMessagesDto) {}
