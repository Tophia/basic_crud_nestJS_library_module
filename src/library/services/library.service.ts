/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../models/book.model';

@Injectable()
export class LibraryService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.findAll();
  }

  findOne(id: string): Promise<Book> {
    return this.bookModel.findOne({
      where: {
        id,
      },
    });
  }

  async createBook(book): Promise<Book> {
    return this.bookModel.create(
      book
    );
  }
async update(book_id, book) {
  const [numberOfAffectedRows, [updatedPost]] = await this.bookModel.update({ ...book }, { where: { id : book_id }, returning: true });

  return { numberOfAffectedRows, updatedPost };
}
async delete(id) {
  return await this.bookModel.destroy({ where: { id } });
}
}
