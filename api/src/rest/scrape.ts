import type { NextApiRequest, NextApiResponse } from 'next';
import { TVScraper } from "../controllers/tv-scrapper/TVScraper";

const scraper = new TVScraper();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      await scraper.processScrapping();

      res.status(200).end('Scraping process completed');
    } catch (error) {
      res.status(500).end(error);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
