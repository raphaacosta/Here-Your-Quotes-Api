import { Request, Response } from 'express';
import connection from '../database/connection';

interface Quote {
  id: number;
  content: string;
  author: string;
  source: string;
  user_id: number;
}

class QuotesController {
  async index(request: Request, response: Response) {
    const { page = 1 } = request.query;
    const user_id = String(request.headers.authorization);
    
    const [count] = await connection('quotes').count();

    const quote = await connection('quotes')
      .where('user_id', user_id)
      .join('users', 'users.id', '=', 'quotes.user_id')
      .select('quotes.*', 'users.username');
    
    if(!quote) {
      return response.send(404).send({ error: 'None quote found' });
    }

    response.header('X-Total-Count', count['count(*)']);

    return response.json(quote);
  }

  async create(request: Request, response: Response) {
    const { content, author, complement  } = request.body;
    const user_id = request.headers.authorization;
    
    try{
      const quote = await connection('quotes').insert({
        content,
        author,
        complement,
        user_id,
      });
  
      return response.send(quote);
    } catch(err) {
      console.log(err);
      return response.status(400).send({ error: 'Error creating the quote' });
    };
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const quote = await connection('quotes').where('id', id).first();

    if(!quote) {
      return response.status(404).send({ error: 'quote not found' });
    }

    return response.json({ quote });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = Number(request.headers.authorization);
    const { content, author, complement } = request.body;

    const quote: Quote = await connection('quotes').where('id', id).first();

    if(quote.user_id !== user_id){
      return response.status(401).json({ error: 'Operation not permited' });
    }

    try{
      await connection('quotes').where('id', id)
      .update({
        content,
        author,
        complement,
      })
      .select('*');

        return response.json({ content, author, complement });
    } catch(err) {
      console.log(err);
      return response.status(400).send({ error: 'Error updating quote' });
    }
    
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = Number(request.headers.authorization);

    const quote: Quote = await connection('quotes')
    .where('id', id)
    .select('user_id')
    .first()

    if(quote.user_id !== user_id){
      console.log(quote.user_id, user_id);
      return response.status(401).json({ error: 'Operation not permited' });
    }

    await connection('quotes').where('id', id).delete();

    return response.status(204);
  }
}

export default QuotesController;