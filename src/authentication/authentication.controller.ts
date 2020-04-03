import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { AuthenticationService } from './authentication.service';
import { UserRO } from './interfaces/user.interface';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Controller('authentication')
export class AuthenticationController {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  @Post('/signup')
  async signUp(@Body(ValidationPipe) signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return this.authenticationService.signUp(signUpCredentials);
  }

  @Post('/signin')
  async signIn(@Body() signInCredentials: SignInCredentialsDTO): Promise<JwtPayload> {
    return this.authenticationService.signIn(signInCredentials);
  }
}
