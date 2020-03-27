import { PipeTransform, BadRequestException } from "@nestjs/common";

export class ParseCasesFilterPipe implements PipeTransform {
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

        return value;
    }

    private getBooleanValue(key: string, value: any): boolean {
        const booleanValues = ['true', 'false'];

        if (!booleanValues.includes(value)) {
            throw new BadRequestException(`'${key}' is not a boolean type.`);
        }

        return value === 'true';
    }
}