import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailTemplate } from './interfaces/email-temaplate.interface';
import { SendGridService } from './send-grid.service';

@ApiTags('send-grid')
@Controller('send-grid')
export class SendGridController {
  constructor(private readonly sendGridService: SendGridService) {}

  @Post()
  @ApiOperation({
    summary: 'Enviar un correo electrónico con una plantilla',
    description:
      'Envía un correo electrónico usando una plantilla predefinida de SendGrid con datos dinámicos.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: {
          type: 'string',
          example: 'test@example.com',
          description: 'Dirección de correo del destinatario',
        },
        from: {
          type: 'string',
          example: 'noreply@example.com',
          description: 'Dirección de correo del remitente',
        },
        subject: {
          type: 'string',
          example: 'Confirmación de pedido',
          description: 'Asunto del correo',
        },
        text: {
          type: 'string',
          example: 'Este es un correo de prueba.',
          description: 'Contenido del correo en texto plano',
        },
        templateId: {
          type: 'string',
          example: 'd-1234567890',
          description: 'ID de la plantilla de SendGrid a utilizar',
        },
        dynamicTemplateData: {
          type: 'object',
          description: 'Datos dinámicos para rellenar la plantilla',
          properties: {
            user: {
              type: 'object',
              description: 'Datos del usuario',
              properties: {
                name: {
                  type: 'string',
                  example: 'John Doe',
                  description: 'Nombre completo del usuario',
                },
                phone: {
                  type: 'string',
                  example: '1234567890',
                  description: 'Número de teléfono del usuario',
                },
                email: {
                  type: 'string',
                  example: 'john.doe@example.com',
                  description: 'Correo electrónico del usuario',
                },
                address: {
                  type: 'string',
                  example: '123 Main St',
                  description: 'Dirección de entrega del usuario',
                },
              },
            },
            products: {
              type: 'array',
              description: 'Lista de productos en el pedido',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    example: 'Producto 1',
                    description: 'Nombre del producto',
                  },
                  quantity: {
                    type: 'number',
                    example: 2,
                    description: 'Cantidad del producto',
                  },
                  price: {
                    type: 'string',
                    example: '10.99',
                    description: 'Precio unitario del producto',
                  },
                },
              },
            },
            total: {
              type: 'string',
              example: '21.98',
              description: 'Monto total del pedido',
            },
          },
        },
      },
      required: ['to', 'from', 'templateId', 'dynamicTemplateData'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El correo ha sido enviado exitosamente.',
    schema: {
      example: {
        message: 'Correo enviado exitosamente',
        emailId: 'abc123xyz456',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud.',
    schema: {
      example: {
        statusCode: 400,
        message: ['El campo "to" debe ser un correo electrónico válido'],
        error: 'Bad Request',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error al enviar el correo.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Error al enviar el correo electrónico',
        error: 'Internal Server Error',
      },
    },
  })
  async create(@Body() emailTemplate: EmailTemplate) {
    return await this.sendGridService.create(emailTemplate);
  }
}
