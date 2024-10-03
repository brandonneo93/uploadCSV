import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CsvData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false }) // Ensure it's non-nullable
  name: string;

  @Column({ nullable: false }) // Ensure it's non-nullable
  email: string;

  @Column({ type: 'longtext', nullable: false }) // Match longtext type
  body: string;
}
