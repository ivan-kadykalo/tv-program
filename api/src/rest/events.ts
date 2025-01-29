import type { NextApiRequest, NextApiResponse } from 'next';
import { DB } from "../services/db/DB";
import { withGetHandler } from "../decorators/withGetHandler";

const db = new DB();

const queryEvents = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json(await db.queryEvents());
};

export default withGetHandler(queryEvents) ;
