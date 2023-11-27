import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  budgets,
  headcounts,
  locations,
  periods,
  seasons,
  themes,
  vehicles,
  withWhos,
} from '../postings.types';

export class SearchPostingDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  keyword: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(periods)
  period: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(headcounts)
  headcount: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(budgets)
  budget: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(locations)
  location: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(themes)
  theme: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(withWhos)
  withWho: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(seasons)
  season: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(vehicles)
  vehicle: string;
}
