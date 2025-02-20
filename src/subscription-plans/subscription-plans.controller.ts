import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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
import { SubscriptionPlansService } from './subscription-plans.service';
import { CreateSubscriptionPlanDto } from './dto/create-subscription-plans.dto';
import { UpdateSubscriptionPlansDto } from './dto/update-subscription-plans.dto';
import { SubscriptionPlan } from './domain/subscription-plans';
import { Creator } from '../auth/decorators/creator.decorator';

@ApiTags('Subscription Plans')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'subscription-plans',
  version: '1',
})
export class SubscriptionPlansController {
  constructor(
    private readonly subscriptionPlansService: SubscriptionPlansService,
  ) {}

  @Post()
  @Creator()
  @ApiOperation({ summary: 'Create subscription plan' })
  @ApiResponse({ type: SubscriptionPlan })
  create(@Body() createDto: CreateSubscriptionPlanDto) {
    return this.subscriptionPlansService.create(createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get subscription plan by id' })
  @ApiResponse({ type: SubscriptionPlan })
  findById(@Param('id') id: string) {
    return this.subscriptionPlansService.findById(id);
  }

  @Get('creator/:creatorId')
  @ApiOperation({ summary: 'Get subscription plans by creator id' })
  @ApiResponse({ type: [SubscriptionPlan] })
  findByCreatorId(@Param('creatorId') creatorId: string) {
    return this.subscriptionPlansService.findByCreatorId(creatorId);
  }

  @Patch(':id')
  @Creator()
  @ApiOperation({ summary: 'Update subscription plan' })
  @ApiResponse({ type: SubscriptionPlan })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateSubscriptionPlansDto,
  ) {
    return this.subscriptionPlansService.update(id, updateDto);
  }

  @Delete(':id')
  @Creator()
  @ApiOperation({ summary: 'Delete subscription plan' })
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
