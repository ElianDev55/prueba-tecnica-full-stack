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
  @ApiOperation({ summary: 'Crear una nueva bebida' })
  @ApiBody({
    type: CreateDrinkDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
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
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createDrinkDto: CreateDrinkDto) {
    return await this.drinksService.create(createDrinkDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las bebidas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las bebidas.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.drinksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una bebida por su id' })
  @ApiParam({ name: 'id', description: 'Id de la bebida a buscar' })
  @ApiResponse({ status: 200, description: 'Bebida encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.drinksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una bebida por su id' })
  @ApiBody({
    type: UpdateDrinkDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          name: 'Bebida actualizada',
          price: '3.50',
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id de la bebida a actualizar' })
  @ApiResponse({ status: 200, description: 'Bebida actualizada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async update(
    @Param('id') id: string,
    @Body() updateDrinkDto: UpdateDrinkDto,
  ) {
    return await this.drinksService.update(id, updateDrinkDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una bebida por su id' })
  @ApiParam({ name: 'id', description: 'Id de la bebida a eliminar' })
  @ApiResponse({ status: 200, description: 'Bebida eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Bebida no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.drinksService.remove(id);
  }
}
