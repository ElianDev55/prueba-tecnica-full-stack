import { PartialType } from '@nestjs/mapped-types';
import { CreateSauceDto } from './create-sauce.dto';

export class UpdateSauceDto extends PartialType(CreateSauceDto) {}
