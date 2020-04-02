import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialsDTO } from './dtos/signup-credentials.dto';
import { UserRO } from './user.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpCredentials: SignUpCredentialsDTO): Promise<UserRO> {
    return await this.userRepository.signUp(signUpCredentials);
  }
}
