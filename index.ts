import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './src/index.app';

dotenv.config();

const httpServer = createServer(app);

const PORT: number = parseInt(process.env.PORT || '3000', 10);

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
