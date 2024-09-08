import { Request, Response, NextFunction } from 'express';

const swaggerAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (apiKey && apiKey === process.env.SWAGGER_API_KEY) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

export default swaggerAuthMiddleware;

