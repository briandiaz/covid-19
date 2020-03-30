import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Gender, Status } from "../case.enum";

export class CaseValidationPipe implements PipeTransform {
  readonly allowedGenders = [
    Gender.MALE, Gender.FEMALE, Gender.NA,
  ];
  readonly allowedStatuses = [
    Status.ACTIVE, Status.RECOVERED, Status.DEAD,
  ]

  transform(value: any) {
    if (value.gender) {
      const gender = value.gender.toUpperCase();
      if (!this.isGenderValid(gender)) {
        throw new BadRequestException(`gender is not valid.`);
      }
      value.gender = gender;
    }

    if (value.status) {
      const status = value.status.toUpperCase();
      if (!this.isStatusValid(status)) {
        throw new BadRequestException(`status is not valid.`);
      }
      value.status = status;
    }
    return value;
  }

  private isGenderValid(gender: any): boolean {
    return this.allowedGenders.includes(gender);
  }

  private isStatusValid(status: any): boolean {
    return this.allowedStatuses.includes(status);
  }
}
