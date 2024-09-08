import app from "./app";
import { setupSwagger } from '../config/swagger';
const PORT = process.env.PORT;
setupSwagger(app);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  if (process.env.NODE_ENV === 'production') {
    console.log(`Swagger disponível em produção com proteção em http://localhost:${PORT}/api-docs`);
  } else {
    console.log(`Swagger disponível em desenvolvimento em http://localhost:${PORT}/api-docs`);
  }
});
