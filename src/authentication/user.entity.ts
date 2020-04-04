import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { IsString, IsEmail, IsNotEmpty, IsDate } from "class-validator";
import { CONSTRAINTS } from "../config/constants";
import * as bcrypt from 'bcryptjs';
import { CaseEntity } from "../cases/cases.entity";

@Entity('user')
@Unique(
  CONSTRAINTS.UQ_USER_USERNAME.name,
  [CONSTRAINTS.UQ_USER_USERNAME.field],
)
@Unique(
  CONSTRAINTS.UQ_USER_EMAIL.name,
  [CONSTRAINTS.UQ_USER_EMAIL.field],
)
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

  @OneToMany(() => CaseEntity, _case => _case.createdBy, { eager: true })
  cases: CaseEntity[];

  @CreateDateColumn({type: "timestamp"})
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt: Date;

  async isValidPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return (hash === this.password);
  }
}