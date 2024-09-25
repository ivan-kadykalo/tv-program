"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERRORS = exports.ProgramType = void 0;
var ProgramType;
(function (ProgramType) {
    ProgramType["SERIES"] = "SERIES";
    ProgramType["MOVIE"] = "MOVIE";
    ProgramType["CARTOON"] = "CARTOON";
    ProgramType["CARTOON_SERIES"] = "CARTOON_SERIES";
})(ProgramType || (exports.ProgramType = ProgramType = {}));
var ERRORS;
(function (ERRORS) {
    ERRORS["FAILED_TO_FETCH_HTML"] = "Failed to fetch HTML";
})(ERRORS || (exports.ERRORS = ERRORS = {}));
