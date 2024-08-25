import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(
        @InjectEntityManager()
        readonly dbManager: EntityManager,
    ) {}
}
