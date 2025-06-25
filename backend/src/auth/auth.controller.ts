import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginDto, ValidateJwtDto } from './dto/login.dto';

@ApiTags('auth')
@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión',
    description:
      'Autentica a un usuario usando su correo electrónico y contraseña.',
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      credenciales: {
        summary: 'Ejemplo de petición',
        value: {
          email: 'test@example.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso.',
    schema: {
      example: {
        user: {
          id: 'uuid-v4',
          name: 'John Doe',
          email: 'test@example.com',
          phone: '1234567890',
          address: '123 Main St',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('validate-token')
  @ApiOperation({
    summary: 'Validar token',
    description: 'Verifica si un token JWT es válido y no ha expirado.',
  })
  @ApiBody({
    type: ValidateJwtDto,
    examples: {
      token: {
        summary: 'Ejemplo de petición',
        value: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Token validado.',
    schema: {
      example: {
        valid: true,
        user: {
          id: 'uuid-v4',
          name: 'John Doe',
          email: 'test@example.com',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'No autorizado.' })
  validateToken(@Body() token: ValidateJwtDto) {
    return this.authService.validateToken(token);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description:
      'Crea una nueva cuenta de usuario y retorna el token de acceso.',
  })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      nuevo_usuario: {
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
    description: 'Usuario registrado exitosamente.',
    schema: {
      example: {
        user: {
          id: 'uuid-v4',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '1234567890',
          address: '123 Main St',
          createdAt: '2024-01-20T12:00:00Z',
        },
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
