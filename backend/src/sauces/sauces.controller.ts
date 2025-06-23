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
import { CreateSauceDto } from './dto/create-sauce.dto';
import { UpdateSauceDto } from './dto/update-sauce.dto';
import { SaucesService } from './sauces.service';

@ApiTags('sauces')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('sauces')
export class SaucesController {
  constructor(private readonly saucesService: SaucesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva salsa' })
  @ApiBody({
    type: CreateSauceDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Salsa de prueba',
          price: '0.50',
          image: 'https://www.example.com/image.png',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'La salsa ha sido creada exitosamente.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createSauceDto: CreateSauceDto) {
    return await this.saucesService.create(createSauceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las salsas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las salsas.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.saucesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una salsa por su id' })
  @ApiParam({ name: 'id', description: 'Id de la salsa a buscar' })
  @ApiResponse({ status: 200, description: 'Salsa encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.saucesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una salsa por su id' })
  @ApiBody({
    type: UpdateSauceDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Salsa actualizada',
          price: '0.75',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id de la salsa a actualizar' })
  @ApiResponse({ status: 200, description: 'Salsa actualizada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateSauceDto: UpdateSauceDto,
  ) {
    return await this.saucesService.update(id, updateSauceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una salsa por su id' })
  @ApiParam({ name: 'id', description: 'Id de la salsa a eliminar' })
  @ApiResponse({ status: 200, description: 'Salsa eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.saucesService.remove(id);
  }
}
