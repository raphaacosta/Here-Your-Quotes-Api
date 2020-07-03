import connection from '../database/connection';
import { Request, Response } from 'express';


class ProfileController {
  async index(request: Request, response: Response) {
    const user_id = request.headers.authorization;

    const quotes = await connection('quotes')
      .where('user_id', Number(user_id))
      .select('*');

    return response.json(quotes);
  }
}

export default ProfileController;