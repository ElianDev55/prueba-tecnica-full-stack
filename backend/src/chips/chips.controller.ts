import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth/auth.guard';
import { ChipsService } from './chips.service';
import { CreateChipDto } from './dto/create-chip.dto';
import { UpdateChipDto } from './dto/update-chip.dto';
@ApiTags('chips')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('chips')
export class ChipsController {
  constructor(private readonly chipsService: ChipsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo chip' })
  @ApiBody({
    type: CreateChipDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Chip de prueba',
          price: '0.99',
          image: 'https://www.example.com/image.png',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El chip ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createChipDto: CreateChipDto) {
    return await this.chipsService.create(createChipDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los chips' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los chips.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.chipsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un chip por su id' })
  @ApiParam({ name: 'id', description: 'Id del chip a buscar' })
  @ApiResponse({ status: 200, description: 'Chip encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Chip no encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.chipsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un chip por su id' })
  @ApiBody({
    type: UpdateChipDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Chip actualizado',
          price: '1.50',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id del chip a actualizar' })
  @ApiResponse({ status: 200, description: 'Chip actualizado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Chip no encontrado.' })
  async update(@Param('id') id: string, @Body() updateChipDto: UpdateChipDto) {
    return await this.chipsService.update(id, updateChipDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un chip por su id' })
  @ApiParam({ name: 'id', description: 'Id del chip a eliminar' })
  @ApiResponse({ status: 200, description: 'Chip eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Chip no encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.chipsService.remove(id);
  }
}
