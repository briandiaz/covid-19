import { IsString } from "class-validator";

export class SignInCredentialsDTO {
  @IsString()
  email?: string;

  @IsString()
  username?: string;

  @IsString()
  password: string;
}