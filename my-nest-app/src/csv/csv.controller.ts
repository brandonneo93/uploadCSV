import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CsvService } from './csv.service';
import { CreateCsvDto } from './dto/create-csv.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('csv')
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  // Upload CSV file
  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the key in the form-data
  async uploadCsv(@UploadedFile() file: Express.Multer.File) {
    return this.csvService.uploadCsv(file);
  }

  // Create a new CSV record
  @Post()
  async create(@Body() createCsvDto: CreateCsvDto) {
    return this.csvService.create(createCsvDto);
  }

  // Get all CSV records
  @Get()
  async findAll() {
    return this.csvService.findAll();
  }

  // Remove a CSV record by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.csvService.remove(+id);
  }
}
