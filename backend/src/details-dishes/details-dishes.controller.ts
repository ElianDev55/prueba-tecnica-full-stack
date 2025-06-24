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
import { DetailsDishesService } from './details-dishes.service';
import { CreateDetailsDishDto } from './dto/create-details-dish.dto';
import { UpdateDetailsDishDto } from './dto/update-details-dish.dto';
@ApiTags('details-dishes')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('details-dishes')
export class DetailsDishesController {
  constructor(private readonly detailsDishesService: DetailsDishesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de plato' })
  @ApiBody({
    type: CreateDetailsDishDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          dishesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          productsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El detalle de plato ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createDetailsDishDto: CreateDetailsDishDto) {
    return await this.detailsDishesService.create(createDetailsDishDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de platos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los detalles de platos.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.detailsDishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de plato por su id' })
  @ApiParam({ name: 'id', description: 'Id del detalle de plato a buscar' })
  @ApiResponse({ status: 200, description: 'Detalle de plato encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Detalle de plato no encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.detailsDishesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de plato por su id' })
  @ApiBody({
    type: UpdateDetailsDishDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          dishesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id del detalle de plato a actualizar' })
  @ApiResponse({ status: 200, description: 'Detalle de plato actualizado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Detalle de plato no encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateDetailsDishDto: UpdateDetailsDishDto,
  ) {
    return await this.detailsDishesService.update(id, updateDetailsDishDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de plato por su id' })
  @ApiParam({ name: 'id', description: 'Id del detalle de plato a eliminar' })
  @ApiResponse({ status: 200, description: 'Detalle de plato eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Detalle de plato no encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.detailsDishesService.remove(id);
  }
}
