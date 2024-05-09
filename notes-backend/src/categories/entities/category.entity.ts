import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Note } from '../../notes/entities/note.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Note, (note) => note.category)
  notes: Note[];
}
