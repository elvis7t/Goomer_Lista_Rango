import { createConnection } from '@database/connection';
import { Response } from 'express-serve-static-core';
class Test {

  static async list(response: Response<any, Record<string, any>, number>): Promise<void> {
    try {
      const connection = await createConnection();

      const sql = 'SELECT * FROM aliens_abduction';

      connection.query(sql, (erro: any, resultados: any) => {
        connection.end();

        if (erro) {
          response.status(400).json(erro);
          throw new Error('Method not implemented.');
        } else {
          response.status(200).json(resultados);
        }
      });
    } catch (error) {
      console.error('Erro ao conectar:', error.message);
      response.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
    }

  }
}

export default Test;
