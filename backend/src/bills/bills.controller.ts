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
  @ApiOperation({ summary: 'Crear una nueva factura' })
  @ApiBody({
    type: CreateBillDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
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
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async create(@Body() createBillDto: CreateBillDto) {
    return await this.billsService.create(createBillDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todas las facturas.',
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findAll() {
    return await this.billsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura por su id' })
  @ApiParam({ name: 'id', description: 'Id de la factura a buscar' })
  @ApiResponse({ status: 200, description: 'Factura encontrada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async findOne(@Param('id') id: string) {
    return await this.billsService.findOne(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener facturas por id de usuario' })
  @ApiParam({ name: 'userId', description: 'Id del usuario a buscar' })
  @ApiResponse({ status: 200, description: 'Facturas encontradas.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async findByUserId(@Param('userId') userId: string) {
    return await this.billsService.findByUserId(userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una factura por su id' })
  @ApiBody({
    type: UpdateBillDto,
    examples: {
      a: {
        summary: 'Ejemplo de peticion',
        value: {
          isDeleted: true,
        },
      },
    },
  })
  @ApiParam({ name: 'id', description: 'Id de la factura a actualizar' })
  @ApiResponse({ status: 200, description: 'Factura actualizada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async update(@Param('id') id: string, @Body() updateBillDto: UpdateBillDto) {
    return await this.billsService.update(id, updateBillDto);
  }

  @Get('sendBi-bill/:bill_id')
  @ApiOperation({
    summary: 'Obtener facturas por id de usuario en los ultimos 2 minutos',
  })
  @ApiParam({ name: 'bill_id', description: 'Id del usuario a buscar' })
  @ApiResponse({ status: 200, description: 'Facturas encontradas.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  async SendBillToEmail(@Param('bill_id') dichesId: string) {
    return await this.billsService.SendBillToEmail(dichesId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una factura por su id' })
  @ApiParam({ name: 'id', description: 'Id de la factura a eliminar' })
  @ApiResponse({ status: 200, description: 'Factura eliminada.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Factura no encontrada.' })
  async remove(@Param('id') id: string) {
    return await this.billsService.remove(id);
  }
}
