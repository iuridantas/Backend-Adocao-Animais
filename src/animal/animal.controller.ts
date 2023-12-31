import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AnimalService } from './animal.service';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HandleException } from 'src/utils/exceptions/exceptionsHelper';
import { AnimalStatus } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('animals')
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('/create')
  async create(@Body() createAnimalDto: CreateAnimalDto, @Request() req) {
    try {
      const userId = req.user.id;
      return this.animalService.create(createAnimalDto, userId);
    } catch (err) {
      HandleException(err);
      throw new BadRequestException(err.message);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/allUser')
  async findAllByUser(@Request() req: any) {
    try {
      const currentUserId = req.user.id; 
      return await this.animalService.findAllByUser(currentUserId);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/all')
  async findAll() {
    try {
      return this.animalService.findAll();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/find/:id')
  async findOne(@Param('id') id: string) {
    try {
      return this.animalService.findOne(id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/update')
  async update(@Body() updateAnimalDto: UpdateAnimalDto, @Request() req) {
    try {
      const userId = req.user.id;

      return this.animalService.update(userId, updateAnimalDto);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Delete('delete/:id')
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;

    try {
      return this.animalService.remove(userId, id);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/updateStatus/:id')
  async toggleStatus(@Param('id') id: string, @Request() req) {
    try {
      const userId = req.user.id;

      const animal = await this.animalService.findOne(id);

      const newStatus =
        animal.status === AnimalStatus.available
          ? AnimalStatus.adopted
          : AnimalStatus.available;

      return this.animalService.updateStatus(userId, id, newStatus);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/byTerm')
  async findAllByTerm(@Query('term') term: string) {
    try {
      return this.animalService.findAllByTerm(term);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/byCategory')
  async findAllByCategory(@Query('category') category: string) {
    try {
      return this.animalService.findAllByCategory(category);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/byStatus')
  async findAllByStatus(@Query('status') status: AnimalStatus) {
    try {
      return this.animalService.findAllByStatus(status);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/byCreationDate')
  async findAllByCreationDate(@Query('creationDate') creationDate: string) {
    try {
      return this.animalService.findAllByCreationDate(creationDate);
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/partner/dogs')
  async findAllDogs() {
    try {
      return this.animalService.findAllDogsFromExternalAPI();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/partner/cats')
  async findAllCats() {
    try {
      return this.animalService.findAllCatsFromExternalAPI();
    } catch (err) {
      HandleException(err);
    }
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/allIncludingExternalData')
  async findAllAnimalsIncludingExternalData() {
    try {
      return this.animalService.findAllAnimalsIncludingExternalData();
    } catch (err) {
      HandleException(err);
    }
  }
}
