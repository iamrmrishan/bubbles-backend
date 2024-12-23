// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateUserBlocksDto } from './create-user-blocks.dto';

export class UpdateUserBlocksDto extends PartialType(CreateUserBlocksDto) {}
