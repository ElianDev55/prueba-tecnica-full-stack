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
  @ApiOperation({
    summary: 'Crear un nuevo plato',
    description: 'Crea un nuevo plato en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateDishDto,
    examples: {
      plato: {
        summary: 'Ejemplo de petición',
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
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Plato de prueba',
        price: '10.99',
        image: 'https://www.example.com/image.png',
        createdBy: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createDishDto: CreateDishDto) {
    return await this.dishesService.create(createDishDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los platos',
    description:
      'Retorna la lista de todos los platos registrados. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los platos.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'Plato de prueba',
          price: '10.99',
          image: 'https://www.example.com/image.png',
          createdBy: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.dishesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un plato por su id',
    description:
      'Retorna los datos de un plato específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del plato a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Plato encontrado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Plato de prueba',
        price: '10.99',
        image: 'https://www.example.com/image.png',
        createdBy: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.dishesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un plato por su id',
    description:
      'Actualiza los datos de un plato específico. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateDishDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Plato de prueba actualizado',
          price: '12.99',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del plato a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Plato actualizado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Plato de prueba actualizado',
        price: '12.99',
        image: 'https://www.example.com/image.png',
        createdBy: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return await this.dishesService.update(id, updateDishDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un plato por su id',
    description:
      'Elimina permanentemente un plato del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del plato a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Plato eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Plato no encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.dishesService.remove(id);
  }
}
