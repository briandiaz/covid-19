import { BaseEntity, Column, PrimaryGeneratedColumn, Entity } from "typeorm";
import { Gender } from "./case.model";

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
  recovered: boolean;

  @Column()
  died: boolean;
}