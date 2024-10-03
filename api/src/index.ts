import { TVScraper } from "./controllers/tv-scrapper/TVScraper";

const scraper = new TVScraper();

export default function () {
  scraper.processScrapping();
}
