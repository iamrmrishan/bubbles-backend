import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { SubscriptionPlansService } from './subscription-plans.service';
import { CreateSubscriptionPlansDto } from './dto/create-subscription-plans.dto';
import { UpdateSubscriptionPlansDto } from './dto/update-subscription-plans.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionPlans } from './domain/subscription-plans';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSubscriptionPlansDto } from './dto/find-all-subscription-plans.dto';

@ApiTags('Subscriptionplans')
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
  @ApiCreatedResponse({
    type: SubscriptionPlans,
  })
  create(@Body() createSubscriptionPlansDto: CreateSubscriptionPlansDto) {
    return this.subscriptionPlansService.create(createSubscriptionPlansDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SubscriptionPlans),
  })
  async findAll(
    @Query() query: FindAllSubscriptionPlansDto,
  ): Promise<InfinityPaginationResponseDto<SubscriptionPlans>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.subscriptionPlansService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SubscriptionPlans,
  })
  findById(@Param('id') id: string) {
    return this.subscriptionPlansService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SubscriptionPlans,
  })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionPlansDto: UpdateSubscriptionPlansDto,
  ) {
    return this.subscriptionPlansService.update(id, updateSubscriptionPlansDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.subscriptionPlansService.remove(id);
  }
}
