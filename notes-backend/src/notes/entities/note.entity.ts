import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ default: false })
  isArchived: boolean;

  @ManyToOne(() => Category, (category) => category.notes)
  category: Category;
}
