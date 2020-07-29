import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UsersController from './controllers/usersController';
import QuotesController from './controllers/quotesController';
import SessionController from './controllers/sessionController';

const routes = express.Router();

const usersController = new UsersController;
const quotesController = new QuotesController;
const sessionController = new SessionController;

routes.post('/sessions', celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
  })
}),sessionController.create);

routes.post('/users_create', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}),usersController.create);
routes.post('/login', usersController.authentication);

routes.get('/quotes', quotesController.index);
routes.get('/quotes/:id', quotesController.show);
routes.post('/quotes', celebrate({
  body: Joi.object().keys({
    user_id: Joi.number(),
    content: Joi.string().required(),
    author: Joi.string(),
    complement: Joi.string(),
  })
}),quotesController.create);

routes.delete('/quotes/:id' ,quotesController.destroy);

routes.put('/quotes/:id', celebrate({
  body: Joi.object().keys({
    user_id: Joi.number(),
    content: Joi.string(),
    author: Joi.string(),
    complement: Joi.string(),
  })
}),quotesController.update);

export default routes;