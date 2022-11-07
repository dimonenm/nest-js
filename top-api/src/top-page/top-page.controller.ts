import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { idValidationPipe } from 'src/pipes/ad-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPgeDto } from './dto/find-top-page.dto';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) { }

  @UsePipes(JwtAuthGuard)
  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
    return this.topPageService.create(dto)
  }

  @UsePipes(JwtAuthGuard)
  @Get(':id')
  async get(@Param('id', idValidationPipe) id: string) {
    const page = await this.topPageService.findById(id)
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }
    return page
  }

  @Get('byAlias:alias')
  async getByAlias(@Param('alias') alias: string) {
    const page = await this.topPageService.findByAlias(alias)
    if (!page) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }
    return page
  }

  @UsePipes(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedPage = await this.topPageService.deleteById(id)
    if (!deletedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }
  }

  @UsePipes(JwtAuthGuard)
  @Patch(':id')
  async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatedPage = await this.topPageService.updateById(id, dto)
    if (!updatedPage) {
      throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
    }
    return updatedPage
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPgeDto) {
    return this.topPageService.findByCategory(dto.firstCategory)
  }
}
