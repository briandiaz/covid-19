import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { AuthenticationService } from './authentication.service';
import { UserRO } from './user.interface';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private authenticationService: AuthenticationService
  ) {}

  @Post()
  async signUp(@Body(ValidationPipe) signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return this.authenticationService.signUp(signUpCredentials);
  }
}
