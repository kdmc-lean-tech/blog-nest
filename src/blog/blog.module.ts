import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationService } from './services/publication.service';
import { PublicationController } from './controllers/publication.controller';
import { PublicationRepository } from './repository/publication.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([PublicationRepository])
    ],
    providers: [
        PublicationService
    ],
    controllers: [PublicationController]
})
export class BlogModule {}
