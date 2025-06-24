import { PartialType } from '@nestjs/mapped-types';
import { CreateDetailsDishDto } from './create-details-dish.dto';

export class UpdateDetailsDishDto extends PartialType(CreateDetailsDishDto) {}
