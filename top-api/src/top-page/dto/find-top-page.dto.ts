import { IsEnum } from 'class-validator';
import { TopLevelCategory } from '../top-page.model';

export class FindTopPgeDto {
  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;
}