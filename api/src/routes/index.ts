import { Router } from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import Test from '../models/testModel';
import authMiddleware from '../middlewares/authMiddleware';
import swaggerAuthMiddleware from '../middlewares/swaggerAuthMiddleware';

const router = Router();
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Goomer Lista Rango',
      version: '1.0.0',
    },
  },
  apis: [path.join(__dirname, '../**/*.ts')],
};

const specs = swaggerJsdoc(options);

router.use('/api-docs', swaggerAuthMiddleware, swaggerUi.serve, swaggerUi.setup(specs));

router.get("/hello", (req, res) => {
  return res.send("Hello");
});

/**
 * @swagger
 * /atendimentos:
 *   get:
 *     summary: Lista os atendimentos
 *     responses:
 *       200:
 *         description: Retorna uma lista de atendimentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Erro ao listar atendimentos
 */
router.get('/atendimentos', (req, res) => {
  return Test.list(res);
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Teste autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna um teste autenticado
 *       401:
 *         description: Não autenticado
 */
router.get("/test", authMiddleware, (req, res) => {
  return Test.list(res);
});

export { router };
