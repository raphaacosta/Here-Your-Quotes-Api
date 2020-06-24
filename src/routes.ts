import express from 'express';


const routes = express.Router();

routes.get('/', (request, response) => {
  return response.json({ message: 'hello Here Your Quotes'});
});

export default routes;