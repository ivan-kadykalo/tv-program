// import cron from "node-cron";

import { TVScraper } from "./controllers/TVScraper/TVScraper";

const scraper = new TVScraper();

// Set up a cron job to run every day at midnight
// cron.schedule('0 0 * * *', () => {
//   console.log('Running daily scrape job...');
//
//   scraper.scrapeTvScheduleForToday();
// }, {
//   scheduled: true,
//   timezone: "Europe/Kiev"
// });

// Initial scrape when the app starts
scraper.scrapeTvScheduleForToday();