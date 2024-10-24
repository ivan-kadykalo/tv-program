import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();

const PORT = process.env.API_PORT;
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_REST_ENDPOINT = process.env.NEXT_PUBLIC_API_REST_ENDPOINT;

app.use(bodyParser.json());

const loadFunctions = () => {
  const functionsDir = path.join(__dirname, 'rest');

  console.log('Rest api endpoints are ready to use:' );

  fs.readdirSync(functionsDir).forEach((file) => {
    const functionHandler = require(path.join(functionsDir, file)).default;

    const apiEndpoint = `${API_REST_ENDPOINT}/${file}`;

    app.get(
      apiEndpoint,
      (req: Request, res: Response) => functionHandler(req, res)
    );

    console.log('🚀:', apiEndpoint );
  });
};

loadFunctions();

app.listen(PORT, () => {
  console.log(`API server running on: ${API_HOST}`);
});