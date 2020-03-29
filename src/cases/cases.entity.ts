import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Status, Gender } from "./case.enum";

@Entity('Case')
export class CaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  nationalId: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  infectionStage: number;

  @Column()
  gender: Gender;

  @Column()
  status: Status;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}