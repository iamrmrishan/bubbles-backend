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
import { ContentReportsService } from './content-reports.service';
import { CreateContentReportDto } from './dto/create-content-report.dto';
import { UpdateContentReportDto } from './dto/update-content-report.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ContentReport } from './domain/content-report';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllContentReportsDto } from './dto/find-all-content-reports.dto';

@ApiTags('Contentreports')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'content-reports',
  version: '1',
})
export class ContentReportsController {
  constructor(private readonly contentReportsService: ContentReportsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ContentReport,
  })
  create(@Body() createContentReportDto: CreateContentReportDto) {
    return this.contentReportsService.create(createContentReportDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ContentReport),
  })
  async findAll(
    @Query() query: FindAllContentReportsDto,
  ): Promise<InfinityPaginationResponseDto<ContentReport>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.contentReportsService.findAllWithPagination({
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
    type: ContentReport,
  })
  findById(@Param('id') id: string) {
    return this.contentReportsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ContentReport,
  })
  update(
    @Param('id') id: string,
    @Body() updateContentReportDto: UpdateContentReportDto,
  ) {
    return this.contentReportsService.update(id, updateContentReportDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.contentReportsService.remove(id);
  }
}
