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
import { AdditionalProductsService } from './additional-products.service';
import { CreateAdditionalProductDto } from './dto/create-additional-product.dto';
import { UpdateAdditionalProductDto } from './dto/update-additional-product.dto';

@ApiTags('additional-products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('additional-products')
export class AdditionalProductsController {
  constructor(
    private readonly additionalProductsService: AdditionalProductsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto adicional',
    description:
      'Crea un nuevo producto adicional en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateAdditionalProductDto,
    examples: {
      producto: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Producto adicional de prueba',
          price: '1.99',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El producto adicional ha sido creado exitosamente.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto adicional de prueba',
        price: '1.99',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createAdditionalProductDto: CreateAdditionalProductDto) {
    return await this.additionalProductsService.create(
      createAdditionalProductDto,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos adicionales',
    description:
      'Retorna la lista de todos los productos adicionales registrados. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los productos adicionales.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'Producto adicional de prueba',
          price: '1.99',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.additionalProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un producto adicional por su id',
    description:
      'Retorna los datos de un producto adicional específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto adicional a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto adicional encontrado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto adicional de prueba',
        price: '1.99',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Producto adicional no encontrado.',
  })
  async findOne(@Param('id') id: string) {
    return await this.additionalProductsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un producto adicional por su id',
    description:
      'Actualiza los datos de un producto adicional específico. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateAdditionalProductDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Producto adicional actualizado',
          price: '2.50',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto adicional a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto adicional actualizado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto adicional actualizado',
        price: '2.50',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Producto adicional no encontrado.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateAdditionalProductDto: UpdateAdditionalProductDto,
  ) {
    return this.additionalProductsService.update(
      id,
      updateAdditionalProductDto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto adicional por su id',
    description:
      'Elimina permanentemente un producto adicional del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto adicional a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Producto adicional eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Producto adicional no encontrado.',
  })
  async remove(@Param('id') id: string) {
    return await this.additionalProductsService.remove(id);
  }
}
