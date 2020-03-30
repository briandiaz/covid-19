import { PipeTransform, BadRequestException } from "@nestjs/common";

export class ParseCasesFilterPipe implements PipeTransform {
    transform(value: any) {
        if (value.infectionStage) {
            value.infectionStage = parseInt(value.infectionStage, 10);
            if (isNaN(value.infectionStage)) {
                throw new BadRequestException('\'infectionStage\' is not a number');
            }
        }
        if (value.status) {
          value.status = value.status.toUpperCase();
        }
        if (value.gender) {
          value.gender = value.gender.toUpperCase();
        }
        return value;
    }
}