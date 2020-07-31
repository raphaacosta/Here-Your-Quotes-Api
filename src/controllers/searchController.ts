import { Request, Response } from 'express';
import connection from '../database/connection';

class SearchController {
  async index(request: Request, response: Response) {
    const user_id = String(request.headers.authorization);
    const { content } = request.query;
    
    try {
      if(!content) {
        return;
      }
      const quotes = await connection('quotes')
        .where('user_id', user_id)
        .where('content', 'like' ,'%'+content+'%')
        .select('*');

      return response.send(quotes);
    }
    catch(err) {
      return response.status(400).send({ error: 'Não foi possível efetuar a pesquisa' });
    }
  }
}

export default SearchController;