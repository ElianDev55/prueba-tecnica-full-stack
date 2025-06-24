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
  @ApiOperation({ summary: 'Crear un nuevo producto adicional' })
  @ApiBody({
    type: CreateAdditionalProductDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
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
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createAdditionalProductDto: CreateAdditionalProductDto) {
    return await this.additionalProductsService.create(
      createAdditionalProductDto,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos adicionales' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los productos adicionales.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.additionalProductsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto adicional por su id' })
  @ApiParam({
    name: 'id',
    description: 'Id del producto adicional a buscar',
  })
  @ApiResponse({ status: 200, description: 'Producto adicional encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Producto adicional no encontrado.',
  })
  async findOne(@Param('id') id: string) {
    return await this.additionalProductsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto adicional por su id' })
  @ApiBody({
    type: UpdateAdditionalProductDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
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
  })
  @ApiResponse({ status: 200, description: 'Producto adicional actualizado.' })
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
  @ApiOperation({ summary: 'Eliminar un producto adicional por su id' })
  @ApiParam({
    name: 'id',
    description: 'Id del producto adicional a eliminar',
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
