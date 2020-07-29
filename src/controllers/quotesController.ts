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
    const user_id = String(request.headers.authorization);

    try{
      const quote = await connection('quotes')
        .where('user_id', user_id)
        .join('users', 'users.id', '=', 'quotes.user_id')
        .select('quotes.*', 'users.username');
      
      if(!quote) {
        return response.send(404).send({ error: 'None quote found' });
      }

      return response.json(quote);
    } catch(err) { return response.status(400).send({ error: 'Erro ao listar frases'} )}
  }

  async create(request: Request, response: Response) {
    const { content, author, complement, user_id} = request.body;
    
    try{
      const quote = await connection('quotes').insert({
        content,
        author,
        complement,
        user_id,
      });
  
      return response.send(quote);
    } catch(err) {
      return response.status(400).send({ error: 'Error creating the quote' });
    };
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = Number(request.headers.authorization);

    try{
      const quote = await connection('quotes')
      .where('id', id)
      .where('user_id', user_id)
      .first();

      if(!quote) {
        return response.status(404).send({ error: 'Quote not found' });
      }

      return response.json({ quote });
    } catch(err) {
      console.log(err);
      response.status(400).json({ error: 'Was not possible to show this quote'});
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { content, author, complement, user_id } = request.body;

    const quote: Quote = await connection('quotes').where('id', id).first();

    if(quote.user_id !== user_id){
      return response.status(401).json({ error: 'Operation not permited' });
    }
    
    try{
      const updatedQuote = await connection('quotes').where('id', id)
      .update({
        content,
        author,
        complement,
      })
      .select('*');

        return response.json(updatedQuote);
    } catch(err) {
      console.log(err);
      return response.status(400).send({ error: 'Error updating quote' });
    }
  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = Number(request.headers.authorization);

    const quote = await connection('quotes')
      .where('id', id)
      .select('user_id')
      .first()

    if(user_id !== quote.user_id) {
      return response.status(401).send({ error:'Operation not permited'});
    }

    try{
      await connection('quotes').where('id', id).delete();
      
      return response.status(204).send({ ok: 'deletei pra ti'});
    } catch(err) {
      return response.status(400).send({ error: 'Não foi possível deletar a frase' });
    }
  }
}

export default QuotesController;