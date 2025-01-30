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
import { MessagesService } from './messages.service';
import { CreateMessagesDto } from './dto/create-messages.dto';
import { UpdateMessagesDto } from './dto/update-messages.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Messages } from './domain/messages';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllMessagesDto } from './dto/find-all-messages.dto';

@ApiTags('Messages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'messages',
  version: '1',
})
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Messages,
  })
  create(@Body() createMessagesDto: CreateMessagesDto) {
    return this.messagesService.create(createMessagesDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Messages),
  })
  async findAll(
    @Query() query: FindAllMessagesDto,
  ): Promise<InfinityPaginationResponseDto<Messages>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.messagesService.findAllWithPagination({
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
    type: Messages,
  })
  findById(@Param('id') id: string) {
    return this.messagesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Messages,
  })
  update(
    @Param('id') id: string,
    @Body() updateMessagesDto: UpdateMessagesDto,
  ) {
    return this.messagesService.update(id, updateMessagesDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
