import connection from '../database/connection';
import { Request, Response } from 'express';

class SessionController {
  async create(request: Request, response: Response) {
    const { id } = request.body;

    try{
      const user = await connection('users')
        .where('id', id)
        .select('username')
        .first();

      if(!user) {
        return response.status(404).json({ err: 'User not found with this id' });
      }

      return response.json(user);
    } catch(err) {
      return response.status(400).send({ error: 'Error connecting to API'});
    }
  }
}

export default SessionController;