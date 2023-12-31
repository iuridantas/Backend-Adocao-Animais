import { Module } from '@nestjs/common';
import { AnimalService } from './animal.service';
import { AnimalController } from './animal.controller';
import { AnimalRepository } from './animal.repository';
import { DatabaseModule } from 'src/prisma/database.module';
import { PassportModule } from '@nestjs/passport';
import { DogApi } from '../utils/API/service/DogApi.service';
import { CatApi } from '../utils/API/service/CatApi.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalRepository, DogApi, CatApi],
})
export class AnimalModule {}
