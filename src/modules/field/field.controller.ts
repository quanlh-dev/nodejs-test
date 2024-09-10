import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '~common';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { CreateFieldDto } from './dto/requests/create-field.request.dto';
import { FieldService } from './services/field.service';

@Controller('field')
@ApiTags('field')
export class FieldController {
    constructor(private readonly fieldsService: FieldService) {}

    @Get()
    async getFields() {
        try {
            const data = await this.fieldsService.getFields();
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create(@Body() data: CreateFieldDto) {
        try {
            const fieldExist = await this.fieldsService.checkExist({
                where: {
                    name: data.name,
                },
            });
            if (fieldExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'field.error.nameExist',
                );
            }

            const newField = await this.fieldsService.createField(data);

            return new SuccessResponse(newField);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
