import { IsString, IsBoolean, IsOptional, IsInt, Min } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  isArchived: boolean;

  @IsInt()
  @Min(1)
  categoryId: number;
}

export class UpdateNoteDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  @IsOptional()
  @IsInt()
  @Min(1)
  categoryId?: number;
}
