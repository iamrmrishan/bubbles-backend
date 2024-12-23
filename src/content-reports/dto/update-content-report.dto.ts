// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateContentReportDto } from './create-content-report.dto';

export class UpdateContentReportDto extends PartialType(
  CreateContentReportDto,
) {}
