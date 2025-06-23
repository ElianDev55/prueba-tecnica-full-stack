import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailTemplate } from './interfaces/email-temaplate.interface';
import { SendGridService } from './send-grid.service';

@ApiTags('send-grid')
@Controller('send-grid')
export class SendGridController {
  constructor(private readonly sendGridService: SendGridService) {}

  @Post()
  @ApiOperation({ summary: 'Enviar un correo electrónico con una plantilla' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', example: 'test@example.com' },
        from: { type: 'string', example: 'noreply@example.com' },
        subject: { type: 'string', example: 'Confirmación de pedido' },
        text: { type: 'string', example: 'Este es un correo de prueba.' },
        templateId: { type: 'string', example: 'd-1234567890' },
        dynamicTemplateData: {
          type: 'object',
          properties: {
            user: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'John Doe' },
                phone: { type: 'string', example: '1234567890' },
                email: { type: 'string', example: 'john.doe@example.com' },
                address: { type: 'string', example: '123 Main St' },
              },
            },
            products: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: { type: 'string', example: 'Producto 1' },
                  quantity: { type: 'number', example: 2 },
                  price: { type: 'string', example: '10.99' },
                },
              },
            },
            total: { type: 'string', example: '21.98' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'El correo ha sido enviado exitosamente.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() emailTemplate: EmailTemplate) {
    return await this.sendGridService.create(emailTemplate);
  }
}
