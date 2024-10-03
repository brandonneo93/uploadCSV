import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CsvModule } from './csv/csv.module';
import { CsvData } from './csv/csv.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'csv',
      entities: [CsvData],
      synchronize: true,
    }),
    CsvModule,
  ],
})
export class AppModule {}
