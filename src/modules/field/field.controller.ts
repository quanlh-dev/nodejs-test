import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Query,
} from '@nestjs/common';
import { FieldRepository } from './field.repository';

import { DatabaseService } from '../../common/modules/database/database.service';
import { FieldListQueryStringDto } from './dto/requests/field-list.request.dto';

import { ApiTags } from '@nestjs/swagger';
import { BaseController, HttpStatus } from '~common';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { CreateFieldDto } from './dto/requests/create-field.request.dto';
import { FieldService } from './services/field.service';

@Controller('field')
@ApiTags('field')
export class FieldController extends BaseController {
    constructor(
        private readonly fieldsService: FieldService,
        private readonly databaseService: DatabaseService,
        private readonly fieldRepository: FieldRepository,
    ) {
        super();
    }

    @Get('/test')
    // @Auth([`${PERMISSION_ACTION.CREATE}_${PERMISSION_RESOURCE.USER}`])
    async test() {
        return 'field/test';
    }

    @Get()
    // @Auth(['readAll_field'])
    async getFields(
        @Query()
        query: FieldListQueryStringDto,
    ) {
        try {
            const data = await this.fieldsService.getFields(query);
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
