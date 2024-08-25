import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FieldEntity } from 'src/common/entites/field.entity';
import { FieldController } from './field.controller';
import { FieldRepository } from './field.repository';
import { FieldService } from './services/field.service';

@Module({
    imports: [TypeOrmModule.forFeature([FieldEntity])],
    controllers: [FieldController],
    providers: [FieldService, FieldRepository],
    exports: [FieldService, FieldRepository],
})
export class FieldModule {}
