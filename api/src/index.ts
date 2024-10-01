import { TVScraper } from "./controllers/tv-scrapper/TVScraper";

const scraper = new TVScraper();

scraper.processScrapping();

module.exports = () => {
  scraper.processScrapping();
}

