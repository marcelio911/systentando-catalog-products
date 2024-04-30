import { Injectable } from '@nestjs/common';
import { CatalogsRepository } from '../repository/catalogs-repository/catalogs-repository';
import { CatalogsMapper } from '../mapper/catalogs-mapper/catalogs-mapper';
import { CatalogsDto } from '../data/dtos/catalogs-dto/catalogs-dto';

@Injectable()
export class CatalogsService {

    constructor(
        private readonly repository: CatalogsRepository
    ) { }
    async getCatalogs(): Promise<CatalogsDto[]> {
        const catalogs = await this.repository.listarTodos();
        const adapted = CatalogsMapper.transformList(catalogs);
        return adapted;
    }

    async salvarCatalogs(data: CatalogsDto): Promise<void> {
        await this.repository.salvarOuAtualizarPorId(CatalogsMapper.schema(data));
    }
}
