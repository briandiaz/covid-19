import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Gender } from "../case.model";

export class GenderValidationPipe implements PipeTransform {
    readonly allowedGenders = [
        Gender.MALE, Gender.FEMALE, Gender.NA,
    ];

    transform(value: any) {
        const gender = value.gender && value.gender.toUpperCase();
        if (gender && !this.isGenderValid(gender)) {
            throw new BadRequestException(`'${gender}' is not a valid gender.`);
        }

        return value;
    }

    private isGenderValid(gender: any): boolean {
        return this.allowedGenders.includes(gender);
    }
}
