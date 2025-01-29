import type { NextApiRequest, NextApiResponse } from 'next';
import { withGetHandler } from "../decorators/withGetHandler";
import {PageScraper} from "../controllers/PageScraper/PageScraper";

const pageScraper = new PageScraper();

const scrapeEventsList = async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  res.status(200).json(
    await pageScraper.getEventsList()
  );
};

export default withGetHandler(scrapeEventsList) ;
