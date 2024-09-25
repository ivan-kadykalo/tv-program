"use strict";
// import cron from "node-cron";
Object.defineProperty(exports, "__esModule", { value: true });
const TVScraper_1 = require("./controllers/TVScraper/TVScraper");
const scraper = new TVScraper_1.TVScraper();
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
