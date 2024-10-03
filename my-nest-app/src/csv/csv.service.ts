import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CsvData } from './csv.entity';
import { CreateCsvDto } from './dto/create-csv.dto';
import * as fs from 'fs';
import * as csv from 'fast-csv';

@Injectable()
export class CsvService {
  constructor(
    @InjectRepository(CsvData)
    private readonly csvRepository: Repository<CsvData>,
  ) {}

  // Create a new CSV record
  async create(createCsvDto: CreateCsvDto): Promise<CsvData> {
    const newCsvData = this.csvRepository.create(createCsvDto);
    return this.csvRepository.save(newCsvData);
  }

  // Retrieve all CSV records
  async findAll(): Promise<CsvData[]> {
    return this.csvRepository.find();
  }

  // Remove a CSV record by ID
  async remove(id: number): Promise<void> {
    await this.csvRepository.delete(id);
  }

  // Upload CSV
  async uploadCsv(file: Express.Multer.File) {
    const results: CreateCsvDto[] = [];

    fs.createReadStream(file.path)
      .pipe(csv.parse({ headers: true }))
      .on('data', (row) => {
        const dto = new CreateCsvDto();

        // Check for required fields
        if (!row.name || !row.email || !row.body) {
          console.error('Missing required fields in row:', row);
          return; // Skip this row
        }

        dto.name = row.name;
        dto.email = row.email;
        dto.body = row.body;
        results.push(dto);
      })
      .on('end', async () => {
        if (results.length > 0) {
          await this.csvRepository.save(results);
        }
        fs.unlinkSync(file.path); // Optionally delete the file after processing
      });
  }
}
