import { Request, Response } from 'express';
import connection from '../database/connection';
import bcrypt from 'bcryptjs'

interface User {
  username: string;
  email: string;
  password: string;
}

class UsersCntroller {
  async index(request: Request, response: Response) {
    const users = await connection('users').select('*');

    return response.json({ users });
  }

  async create(request: Request, response: Response) {
    const { username, email, password} = request.body;

    try{
      const hash = await bcrypt.hash(password, 10);

      await connection('users').insert({
        username,
        email,
        password: hash,
      });
      
      return response.json({ username, email });
    } catch(err) { 
      console.log(err); 
      return response.status(400).send({ message: 'Error creating user'}); 
    }
  }

  async authentication(request: Request, response: Response) {
    const { email, password } = request.body;

    const user: User = await connection('users')
      .where('email', email)
      .select('*')
      .first();

    if(!user) {
      return response.status(404).send({ error: 'User not found' });
    }
    
    if(!await bcrypt.compare(password, user.password)){
      return response.status(400).send({ error: 'Invalida Password' });
    }

    return response.status(200).send(user);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await connection('users').where('id', id).first();

    if(!user) {
      return response.status(404).send({ error: 'None user found' });
    }

    return response.status(200).json({ user });

  }

  async destroy(request: Request, response: Response) {
    const { id } = request.params;
    // const user_id = request.headers.authorization;

    const user = await connection('users')
      .where('id', id)
      .select('username')
      .select('email')
      .first();

    // if(user.user_id !== user_id) {
    //   return response.status(401).send({ error: 'Operation not permited' });
    // }

    await connection('users').where('id', id).delete();

    return response.status(204).send({ success: 'User deleted successfully' });
  }
}

export default UsersCntroller;

/* to the edge of the universe and back. Endure and Survive */