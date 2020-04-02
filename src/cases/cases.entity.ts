import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Status, Gender } from "./case.enum";
import { IsNotEmpty, IsString, IsLatitude, IsLongitude, IsDate } from "class-validator";

@Entity('case')
export class CaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  nationalId: string;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @Column({ type: 'decimal', precision: 7, scale: 2 })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @Column()
  infectionStage: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  gender: Gender;

  @Column()
  @IsNotEmpty()
  @IsString()
  status: Status;

  @CreateDateColumn({type: "timestamp"})
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  @UpdateDateColumn({type: "timestamp"})
  updatedAt!: Date;
}