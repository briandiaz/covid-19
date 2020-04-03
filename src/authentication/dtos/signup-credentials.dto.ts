import { IsString, IsNotEmpty, IsEmail, MinLength, MaxLength, Matches } from "class-validator";
import { PASSWORD_REGEX } from '../../config/constants';

export class SignUpCredentialsDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(30)
  name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(25)
  @IsNotEmpty()
  @Matches(
    PASSWORD_REGEX,
    {
      message: 'password is too weak.'
    },
  )
  password: string;
}