import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAllNotes(): Promise<Note[]> {
    return this.notesRepository.find({
      relations: ['category'],
    });
  }

  async findOneNote(id: number): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    return note;
  }

  async findNotesByCategory(categoryId: number): Promise<Note[]> {
    const notes = await this.notesRepository.find({
      where: { category: { id: categoryId } },
      relations: ['category'],
    });

    if (!notes || notes.length === 0) {
      return [];
    }

    return notes;
  }

  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    const category = await this.categoryRepository.findOne({
      where: { id: createNoteDto.categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    const note = new Note();
    note.title = createNoteDto.title;
    note.content = createNoteDto.content;
    note.category = category;

    const savedNote = await this.notesRepository.save(note);
    return savedNote;
  }

  async updateNote(id: number, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const note = await this.notesRepository.findOne({
      where: { id: id },
    });
    if (!note) {
      throw new NotFoundException(`Note not found`);
    }

    if (updateNoteDto.title !== undefined) {
      note.title = updateNoteDto.title;
    }
    if (updateNoteDto.content !== undefined) {
      note.content = updateNoteDto.content;
    }
    if (updateNoteDto.isArchived !== undefined) {
      note.isArchived = updateNoteDto.isArchived;
    }
    if (updateNoteDto.categoryId !== undefined) {
      const category = await this.categoryRepository.findOne({
        where: { id: updateNoteDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(`Category not found`);
      }
      note.category = category;
    }
    await this.notesRepository.save(note);
    return note;
  }

  async deleteNote(id: number): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
