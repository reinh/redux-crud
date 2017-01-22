"use strict";
const r = require("ramda");
const invariants_1 = require("../invariants");
const findByKey_1 = require("../../../utils/findByKey");
const mergeMutable_1 = require("../../../utils/mergeMutable");
var reducerName = 'updateError';
function error(config, current, record) {
    invariants_1.default(config, current, record, reducerName);
    // We don't want to rollback
    var key = config.key;
    var updatedId = record[key];
    var updatedRecord = findByKey_1.default(current, key, updatedId);
    if (updatedRecord) {
        updatedRecord = r.omit(['busy'], updatedRecord);
        return mergeMutable_1.default(current, updatedRecord, key);
    }
    else {
        return current;
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = error;