import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
}