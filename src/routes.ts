import express from 'express';

import UsersController from './controllers/usersController';
import QuotesController from './controllers/quotesController';
import SessionController from './controllers/sessionController';
import ProfileController from './controllers/profileController'

const routes = express.Router();

const usersController = new UsersController;
const quotesController = new QuotesController;
const profileController = new ProfileController;
const sessionController = new SessionController;

routes.post('/sessions', sessionController.create);
routes.get('/profile', profileController.index);

routes.post('/users_create', usersController.create);
routes.post('/login', usersController.authentication);

routes.get('/quotes', quotesController.index);
routes.post('/quotes', quotesController.create);
routes.delete('/quotes/:id', quotesController.destroy);

export default routes;