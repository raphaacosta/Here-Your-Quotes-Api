import connection from '../database/connection';
import { Request, Response } from 'express';

class SearchController {
  async index(request: Request, response: Response) {
    const user_id = Number(request.body);
    const { id } = request.params;

    const quotes = await connection('quotes')
      .where('user_id', user_id)
      .where('id', id)
      .select('quotes.*');

    return response.json(quotes);
  }
}

export default SearchController;