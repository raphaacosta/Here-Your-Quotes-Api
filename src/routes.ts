import express from 'express';
import { celebrate, Joi } from 'celebrate';

import UsersController from './controllers/usersController';
import QuotesController from './controllers/quotesController';
import SessionController from './controllers/sessionController';
import ProfileController from './controllers/profileController'

const routes = express.Router();

const usersController = new UsersController;
const quotesController = new QuotesController;
const profileController = new ProfileController;
const sessionController = new SessionController;

routes.post('/sessions', celebrate({
  body: Joi.object().keys({
    id: Joi.number().required(),
  })
}),sessionController.create);

routes.get('/profile', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.number().required(),
  })
}),profileController.index);

routes.post('/users_create', celebrate({
  body: Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
}),usersController.create);
routes.post('/login', usersController.authentication);

routes.get('/quotes', quotesController.index);
routes.post('/quotes', celebrate({
  body: Joi.object().keys({
    content: Joi.string().required(),
    author: Joi.string(),
    complement: Joi.string(),
  }),
  headers: Joi.objective().keys({
    authorization: Joi.number().required(),
  })
}),quotesController.create);

routes.delete('/quotes/:id', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.number().required(),
  })
}),quotesController.destroy);

routes.put('/quotes/:id', celebrate({
  body: Joi.object().keys({
    content: Joi.string(),
    author: Joi.string(),
    complement: Joi.string(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.number().required(),
  })
}),quotesController.update);

export default routes;