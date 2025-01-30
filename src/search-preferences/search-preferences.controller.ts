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
import { SearchPreferencesService } from './search-preferences.service';
import { CreateSearchPreferencesDto } from './dto/create-search-preferences.dto';
import { UpdateSearchPreferencesDto } from './dto/update-search-preferences.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SearchPreferences } from './domain/search-preferences';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSearchPreferencesDto } from './dto/find-all-search-preferences.dto';

@ApiTags('Searchpreferences')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'search-preferences',
  version: '1',
})
export class SearchPreferencesController {
  constructor(
    private readonly searchPreferencesService: SearchPreferencesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SearchPreferences,
  })
  create(@Body() createSearchPreferencesDto: CreateSearchPreferencesDto) {
    return this.searchPreferencesService.create(createSearchPreferencesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SearchPreferences),
  })
  async findAll(
    @Query() query: FindAllSearchPreferencesDto,
  ): Promise<InfinityPaginationResponseDto<SearchPreferences>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.searchPreferencesService.findAllWithPagination({
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
    type: SearchPreferences,
  })
  findById(@Param('id') id: string) {
    return this.searchPreferencesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SearchPreferences,
  })
  update(
    @Param('id') id: string,
    @Body() updateSearchPreferencesDto: UpdateSearchPreferencesDto,
  ) {
    return this.searchPreferencesService.update(id, updateSearchPreferencesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.searchPreferencesService.remove(id);
  }
}
