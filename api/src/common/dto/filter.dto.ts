import { Transform } from 'class-transformer'
import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator'

export class Filter {
  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number | undefined

  @IsString()
  @IsOptional()
  language?: string
}
