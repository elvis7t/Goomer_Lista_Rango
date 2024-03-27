
import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import * as path from 'path';
import Test from '../models/testModel';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Goomer Lista Rango ',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, './routes/*.ts')],
};

const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
router.get("/hello", (request, response) => {
  return response.send("Hello");
});

router.get('/atendimentos', (request, response)=> {
  return Test.list(response);
})


router.get("/test", authMiddleware, (request, response) => {
  return Test.list(response);
});
export { router };
