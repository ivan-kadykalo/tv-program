import type { NextApiRequest, NextApiResponse } from 'next';
import { Scraper } from "../services/scrapper/Scraper";
import { withGetHandler } from "../decorators/withGetHandler";

const scraper = new Scraper();

const scrapeData = async (req: NextApiRequest, res: NextApiResponse) => {
  await scraper.processScrapping();

  res.status(200).end('Scraping process completed');
};

export default withGetHandler(scrapeData);
