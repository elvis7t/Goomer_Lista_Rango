import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'developiment' ? '.env.example' : '.env',
});
