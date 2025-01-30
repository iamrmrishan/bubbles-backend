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
import { VerificationsService } from './verifications.service';
import { CreateVerificationsDto } from './dto/create-verifications.dto';
import { UpdateVerificationsDto } from './dto/update-verifications.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Verifications } from './domain/verifications';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllVerificationsDto } from './dto/find-all-verifications.dto';

@ApiTags('Verifications')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'verifications',
  version: '1',
})
export class VerificationsController {
  constructor(private readonly verificationsService: VerificationsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Verifications,
  })
  create(@Body() createVerificationsDto: CreateVerificationsDto) {
    return this.verificationsService.create(createVerificationsDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Verifications),
  })
  async findAll(
    @Query() query: FindAllVerificationsDto,
  ): Promise<InfinityPaginationResponseDto<Verifications>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.verificationsService.findAllWithPagination({
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
    type: Verifications,
  })
  findById(@Param('id') id: string) {
    return this.verificationsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Verifications,
  })
  update(
    @Param('id') id: string,
    @Body() updateVerificationsDto: UpdateVerificationsDto,
  ) {
    return this.verificationsService.update(id, updateVerificationsDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.verificationsService.remove(id);
  }
}
