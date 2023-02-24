import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @ApiProperty({
    description: '',
    example: '',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
