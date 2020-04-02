import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRO } from './user.interface';
import { SignInCredentialsDTO } from './dtos/signin-credentials.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return await this.userRepository.signUp(signUpCredentials);
  }

  async signIn(signInCredentials: SignInCredentialsDTO): Promise<UserRO> {
    const user = await this.userRepository.validateCredentials(signInCredentials);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    return user;
  }
}
