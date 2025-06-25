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
  @ApiOperation({
    summary: 'Crear un nuevo detalle de factura',
    description:
      'Crea un nuevo detalle de factura con los productos seleccionados. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateBillDetailDto,
    examples: {
      detalle: {
        summary: 'Ejemplo de petición',
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
    schema: {
      example: {
        id: 'uuid-v4',
        dichesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        addId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        soucesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        drinksId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        chipsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        total: '100.50',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  create(@Body() createBillDetailDto: CreateBillDetailDto) {
    return this.billDetailsService.create(createBillDetailDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los detalles de factura',
    description:
      'Retorna la lista de todos los detalles de factura registrados. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los detalles de factura.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          dichesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          addId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          soucesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          drinksId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          chipsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          total: '100.50',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.billDetailsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un detalle de factura por su id',
    description:
      'Retorna los datos de un detalle de factura específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del detalle de factura a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle de factura encontrado.',
    schema: {
      example: {
        id: 'uuid-v4',
        dichesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        addId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        soucesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        drinksId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        chipsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        total: '100.50',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({
    status: 404,
    description: 'Detalle de factura no encontrado.',
  })
  findOne(@Param('id') id: string) {
    return this.billDetailsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un detalle de factura por su id',
    description:
      'Actualiza los datos de un detalle de factura específico. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateBillDetailDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          total: '150.00',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del detalle de factura a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalle de factura actualizado.',
    schema: {
      example: {
        id: 'uuid-v4',
        dichesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        addId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        soucesId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        drinksId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        chipsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        total: '150.00',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
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
  @ApiOperation({
    summary: 'Eliminar un detalle de factura por su id',
    description:
      'Elimina permanentemente un detalle de factura del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del detalle de factura a eliminar',
    example: 'uuid-v4',
  })
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
