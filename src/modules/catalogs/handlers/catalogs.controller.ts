import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { CatalogsService } from '../services/catalogs.service';
import { CatalogsDto } from '../data/dtos/catalogs-dto/catalogs-dto';

@Controller('catalogs')
export class CatalogsController {

    constructor(
        private readonly catalogsService: CatalogsService
    ) { }

    @Get('')
    async getCatalogs(): Promise<CatalogsDto[]> {
        try {
            return await this.catalogsService.getCatalogs();
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post('')
    async saveCatalogs(@Body() data: CatalogsDto): Promise<void> {
        try {
            return await this.catalogsService.salvarCatalogs(data);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
