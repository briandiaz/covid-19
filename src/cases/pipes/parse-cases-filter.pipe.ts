import { PipeTransform, BadRequestException } from "@nestjs/common";
import { Gender } from "../case.model";

export class ParseCasesFilterPipe implements PipeTransform {
    readonly allowedGenders = [
        Gender.MALE, Gender.FEMALE, Gender.NA
    ];
    transform(value: any) {
        if (value.infectionStage) {
            value.infectionStage = parseInt(value.infectionStage, 10);
            if (isNaN(value.infectionStage)) {
                throw new BadRequestException('\'infectionStage\' is not a number');
            }
        }
        if (value.recovered) {
            value.recovered = this.getBooleanValue('recovered', value.recovered);
        }
        if (value.died) {
            value.died = this.getBooleanValue('died', value.died);
        }
        if (value.latitude) {
            value.latitude = parseFloat(value.latitude);
            if (isNaN(value.latitude)) {
                throw new BadRequestException('\'latitude\' is not a number');
            }
        }
        if (value.longitude) {
            value.longitude = parseFloat(value.longitude);
            if (isNaN(value.longitude)) {
                throw new BadRequestException('\'longitude\' is not a number');
            }
        }
        if (value.gender) {
            value.gender = value.gender.toUpperCase();
            if (!this.isGenderValid(value.gender)) {
                throw new BadRequestException('\'gender\' is not valid.');
            }
        }

        return value;
    }

    private getBooleanValue(key: string, value: any): boolean {
        const booleanValues = ['true', 'false'];

        if (!booleanValues.includes(value)) {
            throw new BadRequestException(`'${key}' is not a boolean type.`);
        }

        return value === 'true';
    }

    private isGenderValid(gender: any): boolean {
        return this.allowedGenders.includes(gender);
    }
}