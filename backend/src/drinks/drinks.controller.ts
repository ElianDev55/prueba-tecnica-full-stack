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
import { DrinksService } from './drinks.service';
import { CreateDrinkDto } from './dto/create-drink.dto';
import { UpdateDrinkDto } from './dto/update-drink.dto';

@ApiTags('drinks')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('drinks')
export class DrinksController {
  constructor(private readonly drinksService: DrinksService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva bebida',
    description: 'Crea una nueva bebida en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateDrinkDto,
    examples: {
      bebida: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Bebida de prueba',
          price: '2.99',
          image: 'https://www.example.com/image.png',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'La bebida ha sido creada exitosamente.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Bebida de prueba',
        price: '2.99',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createDrinkDto: CreateDrinkDto) {
    return await this.drinksService.create(createDrinkDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las bebidas',
    description:
      'Retorna la lista de todas las bebidas registradas. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las bebidas.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'Bebida de prueba',
          price: '2.99',
          image: 'https://www.example.com/image.png',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.drinksService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una bebida por su id',
    description:
      'Retorna los datos de una bebida específica. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la bebida a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Bebida encontrada.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Bebida de prueba',
        price: '2.99',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.drinksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una bebida por su id',
    description:
      'Actualiza los datos de una bebida específica. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateDrinkDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Bebida actualizada',
          price: '3.50',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la bebida a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Bebida actualizada.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Bebida actualizada',
        price: '3.50',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return await this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una bebida por su id',
    description:
      'Elimina permanentemente una bebida del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la bebida a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Bebida eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.drinksService.remove(id);
  }
}
