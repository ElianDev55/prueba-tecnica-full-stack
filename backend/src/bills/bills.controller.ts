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
import { BillsService } from './bills.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@ApiTags('bills')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('bills')
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva factura',
    description:
      'Crea una nueva factura en el sistema. Requiere autenticación.',
  })
  @ApiBody({
    type: CreateBillDto,
    examples: {
      factura: {
        summary: 'Ejemplo de petición',
        value: {
          billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'La factura ha sido creada exitosamente.',
    schema: {
      example: {
        id: 'uuid-v4',
        billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        isDeleted: false,
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createBillDto: CreateBillDto) {
    return await this.billsService.create(createBillDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las facturas',
    description:
      'Retorna la lista de todas las facturas registradas. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las facturas.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          isDeleted: false,
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.billsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una factura por su id',
    description:
      'Retorna los datos de una factura específica. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la factura a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Factura encontrada.',
    schema: {
      example: {
        id: 'uuid-v4',
        billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        isDeleted: false,
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.billsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({
    summary: 'Obtener facturas por id de usuario',
    description:
      'Retorna todas las facturas asociadas a un usuario específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'userId',
    description: 'Id del usuario a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Facturas encontradas.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
          isDeleted: false,
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findByUserId(@Param('userId') userId: string) {
    return await this.billsService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar una factura por su id',
    description:
      'Actualiza los datos de una factura específica. Los campos son opcionales. Requiere autenticación.',
  })
  @ApiBody({
    type: UpdateBillDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          isDeleted: true,
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la factura a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Factura actualizada.',
    schema: {
      example: {
        id: 'uuid-v4',
        billDetailsId: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        created_by: 'a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6',
        isDeleted: true,
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return await this.billsService.update(id, updateBillDto);
  }

  @Get('sendBi-bill/:bill_id')
  @ApiOperation({
    summary: 'Enviar factura por email',
    description:
      'Envía una factura específica por correo electrónico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'bill_id',
    description: 'Id de la factura a enviar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Factura enviada exitosamente.',
    schema: {
      example: {
        message: 'Factura enviada exitosamente al correo electrónico',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async SendBillToEmail(@Param('bill_id') dichesId: string) {
    return await this.billsService.SendBillToEmail(dichesId);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una factura por su id',
    description:
      'Elimina permanentemente una factura del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id de la factura a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Factura eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.billsService.remove(id);
  }
}
