import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from "../services/db/DB";
import {withGetHandler} from "../decorators/withGetHandler";

const db = new DB();

const cleanOldRecords = async (req: NextApiRequest, res: NextApiResponse) => {
  await db.cleanOldRecords();

  res.status(200).end('Cleaning completed');
};

export default withGetHandler(cleanOldRecords);
