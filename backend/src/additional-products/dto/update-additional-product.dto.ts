import { PartialType } from '@nestjs/mapped-types';
import { CreateAdditionalProductDto } from './create-additional-product.dto';

export class UpdateAdditionalProductDto extends PartialType(
  CreateAdditionalProductDto,
) {}
