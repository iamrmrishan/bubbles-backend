import { Controller, UseGuards } from '@nestjs/common';
import { StripeService } from './stripes.service';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Stripes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'stripes',
  version: '1',
})
export class StripesController {
  constructor(private readonly stripesService: StripeService) {}
}
