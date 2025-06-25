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
  @ApiOperation({
    summary: 'Crear una nueva salsa',
    description: 'Crea una nueva salsa en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateSauceDto,
    examples: {
      salsa: {
        summary: 'Ejemplo de petición',
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
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Salsa de prueba',
        price: '0.50',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createSauceDto: CreateSauceDto) {
    return await this.saucesService.create(createSauceDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las salsas',
    description:
      'Retorna la lista de todas las salsas registradas. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las salsas.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'Salsa de prueba',
          price: '0.50',
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
    return await this.saucesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una salsa por su id',
    description:
      'Retorna los datos de una salsa específica. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la salsa a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Salsa encontrada.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Salsa de prueba',
        price: '0.50',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.saucesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una salsa por su id',
    description:
      'Actualiza los datos de una salsa específica. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateSauceDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Salsa actualizada',
          price: '0.75',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la salsa a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Salsa actualizada.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Salsa actualizada',
        price: '0.75',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateSauceDto: UpdateSauceDto,
  ) {
    return await this.saucesService.update(id, updateSauceDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una salsa por su id',
    description:
      'Elimina permanentemente una salsa del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la salsa a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Salsa eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Salsa no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.saucesService.remove(id);
  }
}
