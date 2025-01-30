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
import { ContentAttributesService } from './content-attributes.service';
import { CreateContentAttributesDto } from './dto/create-content-attributes.dto';
import { UpdateContentAttributesDto } from './dto/update-content-attributes.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ContentAttributes } from './domain/content-attributes';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllContentAttributesDto } from './dto/find-all-content-attributes.dto';

@ApiTags('Contentattributes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'content-attributes',
  version: '1',
})
export class ContentAttributesController {
  constructor(
    private readonly contentAttributesService: ContentAttributesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: ContentAttributes,
  })
  create(@Body() createContentAttributesDto: CreateContentAttributesDto) {
    return this.contentAttributesService.create(createContentAttributesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ContentAttributes),
  })
  async findAll(
    @Query() query: FindAllContentAttributesDto,
  ): Promise<InfinityPaginationResponseDto<ContentAttributes>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.contentAttributesService.findAllWithPagination({
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
    type: ContentAttributes,
  })
  findById(@Param('id') id: string) {
    return this.contentAttributesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ContentAttributes,
  })
  update(
    @Param('id') id: string,
    @Body() updateContentAttributesDto: UpdateContentAttributesDto,
  ) {
    return this.contentAttributesService.update(id, updateContentAttributesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.contentAttributesService.remove(id);
  }
}
