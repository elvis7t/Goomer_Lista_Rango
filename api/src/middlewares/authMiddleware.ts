import { NextFunction, Request, Response } from 'express';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
  user?: any;
}

const secretKey = process.env.JWT_SECRET || 'suaChaveSecretaPadrao';

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const token = request.header('Authorization');

  if (!token) {
    return response.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    let decodedToken = false;
    if (token == secretKey) {
      decodedToken = true;
    }
    if (decodedToken) {
      (request as AuthenticatedRequest).user = decodedToken;
      next();
    } else {
      throw new Error('Erro ao decodificar token');
    }
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return response.status(401).json({ message: 'Token expirado' });
    } else if (error instanceof JsonWebTokenError) {
      return response.status(401).json({ message: 'Token inválido' });
    } else {
      console.error('Erro ao verificar token:', error);
      return response.status(500).json({ message: 'Erro interno do servidor' });
    }
  }
};

export default authMiddleware;
