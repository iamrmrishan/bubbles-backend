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
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionsDto } from './dto/create-subscriptions.dto';
import { UpdateSubscriptionsDto } from './dto/update-subscriptions.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Subscriptions } from './domain/subscriptions';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSubscriptionsDto } from './dto/find-all-subscriptions.dto';

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
  @ApiCreatedResponse({
    type: Subscriptions,
  })
  create(@Body() createSubscriptionsDto: CreateSubscriptionsDto) {
    return this.subscriptionsService.create(createSubscriptionsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Subscriptions),
  })
  async findAll(
    @Query() query: FindAllSubscriptionsDto,
  ): Promise<InfinityPaginationResponseDto<Subscriptions>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.subscriptionsService.findAllWithPagination({
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
    type: Subscriptions,
  })
  findById(@Param('id') id: string) {
    return this.subscriptionsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Subscriptions,
  })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionsDto: UpdateSubscriptionsDto,
  ) {
    return this.subscriptionsService.update(id, updateSubscriptionsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.subscriptionsService.remove(id);
  }
}
