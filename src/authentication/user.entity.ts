import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique } from "typeorm";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";
import { CONSTRAINTS } from "./constants";
import * as bcrypt from 'bcrypt';

@Entity('user')
@Unique(CONSTRAINTS.UQ_USER_USERNAME.name, [CONSTRAINTS.UQ_USER_USERNAME.field])
@Unique(CONSTRAINTS.UQ_USER_EMAIL.name, [CONSTRAINTS.UQ_USER_EMAIL.field])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Column()
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  username: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  salt: string;

  async isValidPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return (hash === this.password);
  }
}