import {ERRORS, Event} from "./PageScraper.typedefs";
import {TeleprogramScraper} from "../../services/TeleprogramScraper/TeleprogramScraper";

const pageScraper = new TeleprogramScraper();

export class BasePageScraper {
  public scrapeTvScheduleByDate(date: string): Promise<Event[]> {
    throw new Error('Method not implemented.');
  };
}

export class PageScraper {
  public async getEventsList(): Promise<Event[]> {
    try {
      const daysDuration = 10;

      const results = await Promise.all(
        Array.from(
          { length: daysDuration },
          (_, i) => i
        ).map(async (i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);

          const currentDay = date.toISOString().split('T')[0];

          return pageScraper.scrapeTvScheduleByDate(currentDay);
        })
      );

      const flatResult = results.flat();
      const sortedResult = flatResult.sort((a, b) => a.time.getTime() - b.time.getTime());

      return sortedResult;
    } catch (error) {
      throw new Error(ERRORS.SCRAPING_FAILED);
    }
  }
}
