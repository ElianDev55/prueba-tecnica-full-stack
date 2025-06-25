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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@ApiTags('products')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description:
      'Crea un nuevo producto en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateProductDto,
    examples: {
      producto: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Producto de prueba',
          image: 'https://www.example.com/image.png',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El producto ha sido creado exitosamente.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto de prueba',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los productos',
    description:
      'Retorna la lista de todos los productos registrados. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los productos.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'Producto de prueba',
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
    return await this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un producto por su id',
    description:
      'Retorna los datos de un producto específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto encontrado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto de prueba',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un producto por su id',
    description:
      'Actualiza los datos de un producto específico. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateProductDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Producto actualizado',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Producto actualizado',
        image: 'https://www.example.com/image.png',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un producto por su id',
    description:
      'Elimina permanentemente un producto del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del producto a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}
