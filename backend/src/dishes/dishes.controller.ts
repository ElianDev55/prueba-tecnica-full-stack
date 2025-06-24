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
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
@ApiTags('dishes')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo plato' })
  @ApiBody({
    type: CreateDishDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Plato de prueba',
          price: '10.99',
          image: 'https://www.example.com/image.png',
          createdBy: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El plato ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createDishDto: CreateDishDto) {
    return await this.dishesService.create(createDishDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los platos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los platos.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.dishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un plato por su id' })
  @ApiParam({ name: 'id', description: 'Id del plato a buscar' })
  @ApiResponse({ status: 200, description: 'Plato encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.dishesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un plato por su id' })
  @ApiBody({
    type: UpdateDishDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Plato de prueba actualizado',
          price: '12.99',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id del plato a actualizar' })
  @ApiResponse({ status: 200, description: 'Plato actualizado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return await this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un plato por su id' })
  @ApiParam({ name: 'id', description: 'Id del plato a eliminar' })
  @ApiResponse({ status: 200, description: 'Plato eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.dishesService.remove(id);
  }
}
