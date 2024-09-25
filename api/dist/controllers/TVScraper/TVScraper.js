"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TVScraper = void 0;
const axios_1 = __importDefault(require("axios"));
const fs = __importStar(require("fs"));
const cheerio = require('cheerio');
const TVScraper_typedefs_1 = require("./TVScraper.typedefs");
const TVScraper_constants_1 = require("./TVScraper.constants");
class TVScraper {
    scrapeTvScheduleForToday() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('🚨🚨🚨', 'Scrapping data');
            // const today = new Date().toISOString().split('T')[0];
            //
            // await this.scrapeTvScheduleByDate(today);
        });
    }
    scrapeTvScheduleByDate(date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const scrapeLink = `${TVScraper_constants_1.BASE_URL}${date}${TVScraper_constants_1.PERIOD}`;
                const html = yield this.fetchHtml(scrapeLink);
                const $ = cheerio.load(html);
                const scrapedDataMap = new Map();
                $('.tv-channel').each((index, element) => {
                    const channelName = $(element)
                        .find('.tv-channel__title a')
                        .text()
                        .trim();
                    $(element)
                        .find('.tv-channel-events__item')
                        .each((i, event) => {
                        const time = this.extractTime($(event));
                        const title = $(event).find('.tv-event__title').text();
                        const type = this.determineType(title);
                        const programName = this.cleanName(title);
                        if (!type)
                            return;
                        scrapedDataMap.set(programName, {
                            id: programName,
                            name: programName,
                            type: type,
                            tvInfo: {
                                channelName: channelName,
                                time: time,
                                date: date,
                            }
                        });
                    });
                });
                const scrapedDataArray = Array.from(scrapedDataMap.values());
                console.log('🚀', 'Page successfully scraped');
                fs.writeFileSync(TVScraper_constants_1.WRITE_FILE_DIRECTORY, JSON.stringify(scrapedDataArray, null, 2));
            }
            catch (error) {
                console.error('🚨', 'Error scraping data:', error);
            }
        });
    }
    fetchHtml(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios_1.default.get(url);
                return response.data;
            }
            catch (error) {
                console.error({
                    message: TVScraper_typedefs_1.ERRORS.FAILED_TO_FETCH_HTML,
                    url: url,
                    error: error,
                });
                throw new Error(TVScraper_typedefs_1.ERRORS.FAILED_TO_FETCH_HTML);
            }
        });
    }
    extractTime(eventElement) {
        return eventElement
            .find('.tv-event__time')
            .text()
            .trim()
            .replace(/\s+/g, ' ');
    }
    cleanName(name) {
        return name
            // Remove program type prefixes
            .replace(/(?:^|\s)["']?(Х\/ф|М\/ф|М\/с|Т\/с)["']?\s*/g, '')
            // Remove quotes
            .replace(/['"]/g, '')
            // Remove 'Премєра' lower or upper case
            .replace(/Прем['єЄ]ра/gi, '')
            // Remove unbreakable spaces
            .replace(/\u00A0/g, ' ')
            // Remove multiple spaces
            .replace(/\s+/g, ' ')
            // Remove leading or trailing dots and commas
            .replace(/^[.,\s]+|[.,\s]+$/g, '')
            // Final trim
            .trim();
    }
    determineType(name) {
        if (name.includes('Х/ф'))
            return TVScraper_typedefs_1.ProgramType.MOVIE;
        if (name.includes('М/ф'))
            return TVScraper_typedefs_1.ProgramType.CARTOON;
        if (name.includes('М/с'))
            return TVScraper_typedefs_1.ProgramType.CARTOON_SERIES;
        if (name.includes('Т/с'))
            return TVScraper_typedefs_1.ProgramType.SERIES;
        return null;
    }
}
exports.TVScraper = TVScraper;
