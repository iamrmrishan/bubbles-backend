import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { Subscription } from './domain/subscriptions';

@ApiTags('Subscriptions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'subscriptions',
  version: '1',
})
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create subscription' })
  @ApiResponse({ type: Subscription })
  create(@Body() createDto: CreateSubscriptionsDto) {
    return this.subscriptionsService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription by id' })
  @ApiResponse({ type: Subscription })
  findById(@Param('id') id: string) {
    return this.subscriptionsService.findById(id);
  }

  @Get('subscriber/:subscriberId')
  @ApiOperation({ summary: 'Get subscriptions by subscriber id' })
  @ApiResponse({ type: [Subscription] })
  findBySubscriberId(@Param('subscriberId') subscriberId: string) {
    return this.subscriptionsService.findBySubscriberId(subscriberId);
  }

  @Get('creator/:creatorId')
  @ApiOperation({ summary: 'Get subscriptions by creator id' })
  @ApiResponse({ type: [Subscription] })
  findByCreatorId(@Param('creatorId') creatorId: string) {
    return this.subscriptionsService.findByCreatorId(creatorId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Cancel subscription' })
  cancel(@Param('id') id: string) {
    return this.subscriptionsService.cancel(id);
  }
}
