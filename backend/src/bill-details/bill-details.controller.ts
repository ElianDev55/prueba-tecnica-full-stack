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
import { BillDetailsService } from './bill-details.service';
import { CreateBillDetailDto } from './dto/create-bill-detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill-detail.dto';

@ApiTags('bill-details')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bill-details')
export class BillDetailsController {
  constructor(private readonly billDetailsService: BillDetailsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo detalle de factura' })
  @ApiBody({
    type: CreateBillDetailDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          dichesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          addId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          soucesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          drinksId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          chipsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          total: '100.50',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El detalle de factura ha sido creado exitosamente.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  create(@Body() createBillDetailDto: CreateBillDetailDto) {
    return this.billDetailsService.create(createBillDetailDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los detalles de factura' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los detalles de factura.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.billDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un detalle de factura por su id' })
  @ApiParam({ name: 'id', description: 'Id del detalle de factura a buscar' })
  @ApiResponse({ status: 200, description: 'Detalle de factura encontrado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.billDetailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un detalle de factura por su id' })
  @ApiBody({
    type: UpdateBillDetailDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          total: '150.00',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del detalle de factura a actualizar',
  })
  @ApiResponse({ status: 200, description: 'Detalle de factura actualizado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado.',
  })
  update(
    @Param('id') id: string,
    @Body() updateBillDetailDto: UpdateBillDetailDto,
  ) {
    return this.billDetailsService.update(id, updateBillDetailDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un detalle de factura por su id' })
  @ApiParam({ name: 'id', description: 'Id del detalle de factura a eliminar' })
  @ApiResponse({ status: 200, description: 'Detalle de factura eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado.',
  })
  remove(@Param('id') id: string) {
    return this.billDetailsService.remove(id);
  }
}
