import { Request, Response, NextFunction } from 'express';

const swaggerAuthMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const apiKey = request.query.api_key as string | undefined;
  console.log('Received api_key:', apiKey)
  if (process.env.NODE_ENV === 'development') {
    return next();
  }
  if (!apiKey) {
    return next();
  }

  if (apiKey === process.env.SWAGGER_API_KEY) {
    console.log('API key validated.');
    return next();
  } else {
    console.log('Unauthorized - API key incorrect.');
    return response.status(401).send('Unauthorized - API key incorrect');
  }
};

export default swaggerAuthMiddleware;
