import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 5000;

app.use(bodyParser.json());

const loadFunctions = () => {
  const functionsDir = path.join(__dirname, 'rest');

  fs.readdirSync(functionsDir).forEach((file) => {
    if (file.endsWith('.ts') || file.endsWith('.js')) {
      const functionName = path.basename(file, path.extname(file));
      const functionHandler = require(path.join(functionsDir, file)).default;

      app.get(
        `/api/rest/${functionName}`,
        (req: Request, res: Response) => functionHandler(req, res)
      );
    }
  });
};

loadFunctions();

app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`);
});