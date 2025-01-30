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
import { CreatorAttributesService } from './creator-attributes.service';
import { CreateCreatorAttributesDto } from './dto/create-creator-attributes.dto';
import { UpdateCreatorAttributesDto } from './dto/update-creator-attributes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CreatorAttributes } from './domain/creator-attributes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllCreatorAttributesDto } from './dto/find-all-creator-attributes.dto';

@ApiTags('Creatorattributes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'creator-attributes',
  version: '1',
})
export class CreatorAttributesController {
  constructor(
    private readonly creatorAttributesService: CreatorAttributesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: CreatorAttributes,
  })
  create(@Body() createCreatorAttributesDto: CreateCreatorAttributesDto) {
    return this.creatorAttributesService.create(createCreatorAttributesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(CreatorAttributes),
  })
  async findAll(
    @Query() query: FindAllCreatorAttributesDto,
  ): Promise<InfinityPaginationResponseDto<CreatorAttributes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.creatorAttributesService.findAllWithPagination({
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
    type: CreatorAttributes,
  })
  findById(@Param('id') id: string) {
    return this.creatorAttributesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: CreatorAttributes,
  })
  update(
    @Param('id') id: string,
    @Body() updateCreatorAttributesDto: UpdateCreatorAttributesDto,
  ) {
    return this.creatorAttributesService.update(id, updateCreatorAttributesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.creatorAttributesService.remove(id);
  }
}
