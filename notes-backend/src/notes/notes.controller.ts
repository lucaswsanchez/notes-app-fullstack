import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { NotesService } from './notes.service';
  import { CreateNoteDto, UpdateNoteDto } from './dto/note.dto';
  
  @Controller('notes')
  export class NotesController {
    constructor(private readonly notesService: NotesService) {}
  
    @Get()
    getAllNotes() {
      return this.notesService.getAllNotes();
    }
  
    @Get(':id')
    findOneNote(@Param('id') id: number) {
      return this.notesService.findOneNote(id);
    }
  
    @Get('categories/:categoryId')
    findNotesByCategory(@Param('categoryId') categoryId: number) {
      return this.notesService.findNotesByCategory(categoryId);
    }
  
    @Post()
    createNote(@Body() createNoteDto: CreateNoteDto) {
      return this.notesService.createNote(createNoteDto);
    }
  
    @Put(':id')
    updateNote(@Param('id') id: number, @Body() updateNoteDto: UpdateNoteDto) {
      return this.notesService.updateNote(id, updateNoteDto);
    }
  
    @Delete(':id')
    deleteNote(@Param('id') id: number) {
      return this.notesService.deleteNote(id);
    }
  }
  