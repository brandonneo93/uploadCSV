import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { CsvData } from './csv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CsvData])],
  controllers: [CsvController],
  providers: [CsvService],
})
export class CsvModule {}
