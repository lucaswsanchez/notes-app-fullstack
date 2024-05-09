import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: number) {
    return this.categoriesService.findOneCategory(id);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createCategory(createCategoryDto);
  }

  @Delete(':id')
  deleteCategory(@Param('id') id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
