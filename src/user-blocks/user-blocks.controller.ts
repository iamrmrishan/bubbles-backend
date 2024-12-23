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
import { UserBlocksService } from './user-blocks.service';
import { CreateUserBlocksDto } from './dto/create-user-blocks.dto';
import { UpdateUserBlocksDto } from './dto/update-user-blocks.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UserBlocks } from './domain/user-blocks';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllUserBlocksDto } from './dto/find-all-user-blocks.dto';

@ApiTags('Userblocks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'user-blocks',
  version: '1',
})
export class UserBlocksController {
  constructor(private readonly userBlocksService: UserBlocksService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserBlocks,
  })
  create(@Body() createUserBlocksDto: CreateUserBlocksDto) {
    return this.userBlocksService.create(createUserBlocksDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(UserBlocks),
  })
  async findAll(
    @Query() query: FindAllUserBlocksDto,
  ): Promise<InfinityPaginationResponseDto<UserBlocks>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.userBlocksService.findAllWithPagination({
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
    type: UserBlocks,
  })
  findById(@Param('id') id: string) {
    return this.userBlocksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: UserBlocks,
  })
  update(
    @Param('id') id: string,
    @Body() updateUserBlocksDto: UpdateUserBlocksDto,
  ) {
    return this.userBlocksService.update(id, updateUserBlocksDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.userBlocksService.remove(id);
  }
}
