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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo usuario',
    description:
      'Crea un nuevo usuario en el sistema. Todos los campos son obligatorios.',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      usuario: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          password: 'password123',
          address: '123 Main St',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El usuario ha sido creado exitosamente.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Retorna la lista de todos los usuarios registrados. Requiere autenticación.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los usuarios.',
    schema: {
      example: [
        {
          id: 'uuid-v4',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          address: '123 Main St',
          createdAt: '2024-01-20T12:00:00Z',
          updatedAt: '2024-01-20T12:00:00Z',
        },
      ],
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un usuario por su id',
    description:
      'Retorna los datos de un usuario específico. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del usuario a buscar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario encontrado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        address: '123 Main St',
        createdAt: '2024-01-20T12:00:00Z',
        updatedAt: '2024-01-20T12:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario por su id',
    description:
      'Actualiza los datos de un usuario específico. Los campos son opcionales.',
  })
  @ApiBody({
    type: UpdateUserDto,
    examples: {
      actualizacion: {
        summary: 'Ejemplo de petición',
        value: {
          name: 'Jane Doe',
          phone: '0987654321',
        },
      },
    },
  })
  @ApiParam({
    name: 'id',
    description: 'Id del usuario a actualizar',
    example: 'uuid-v4',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuario actualizado.',
    schema: {
      example: {
        id: 'uuid-v4',
        name: 'Jane Doe',
        email: 'john.doe@example.com',
        phone: '0987654321',
        address: '123 Main St',
        updatedAt: '2024-01-20T13:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario por su id',
    description:
      'Elimina permanentemente un usuario del sistema. Requiere autenticación.',
  })
  @ApiParam({
    name: 'id',
    description: 'Id del usuario a eliminar',
    example: 'uuid-v4',
  })
  @ApiResponse({ status: 200, description: 'Usuario eliminado.' })
  @ApiResponse({ status: 403, description: 'Prohibido.' })
  @ApiResponse({ status: 404, description: 'Usuario no encontrado.' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
