"use strict";
var r = require("ramda");
var invariant = require("invariant");
var actionTypesFor_1 = require("./actionTypesFor");
var assertNotArray_1 = require("./utils/assertNotArray");
var constants_1 = require("./constants");
var getDefaultConfig_1 = require("./getDefaultConfig");
// const invariant = require("invariant")
function actionCreatorsFor(resourceName, config) {
    if (resourceName == null)
        throw new Error("actionCreatorsFor: Expected resourceName");
    config = config || getDefaultConfig_1.default(resourceName);
    config = r.merge(config, { resourceName: resourceName });
    var actionTypes = actionTypesFor_1.default(resourceName);
    var key = config.key || constants_1.default.DEFAULT_KEY;
    function assertError(actionCreatorName, error) {
        invariant(error != null, "Expected error in " + actionCreatorName);
    }
    function assertOneRecord(actionCreatorName, record) {
        invariant(record != null, "Expected record in " + actionCreatorName);
        assertNotArray_1.default(config, "createStart", record);
        invariant(record[key] != null, "Expected record." + key + " in " + actionCreatorName);
    }
    function assertManyRecords(actionCreatorName, records) {
        invariant(records != null, "Expected records " + actionCreatorName);
    }
    return {
        fetchStart: function (data) {
            return {
                data: data,
                type: actionTypes.fetchStart,
            };
        },
        fetchSuccess: function (records, data) {
            var name = "fetchSuccess";
            assertManyRecords(name, records);
            return {
                data: data,
                records: records,
                type: actionTypes.fetchSuccess,
            };
        },
        fetchError: function (error, data) {
            var name = "fetchError";
            assertError(name, error);
            return {
                data: data,
                error: error,
                type: actionTypes.fetchError,
            };
        },
        createStart: function (record, data) {
            var name = "createStart";
            assertOneRecord(name, record);
            return {
                data: data,
                record: record,
                type: actionTypes.createStart,
            };
        },
        createSuccess: function (record, clientGeneratedKey, data) {
            var name = "createSuccess";
            assertOneRecord(name, record);
            return {
                cid: clientGeneratedKey,
                data: data,
                record: record,
                type: actionTypes.createSuccess,
            };
        },
        createError: function (error, record, data) {
            var name = "createError";
            assertError(name, error);
            assertOneRecord(name, record);
            return {
                data: data,
                error: error,
                record: record,
                type: actionTypes.createError,
            };
        },
        updateStart: function (record, data) {
            var name = "updateStart";
            assertOneRecord(name, record);
            return {
                data: data,
                record: record,
                type: actionTypes.updateStart,
            };
        },
        updateSuccess: function (record, data) {
            var name = "updateSuccess";
            assertOneRecord(name, record);
            return {
                data: data,
                record: record,
                type: actionTypes.updateSuccess,
            };
        },
        updateError: function (error, record, data) {
            var name = "updateError";
            assertError(name, error);
            assertOneRecord(name, record);
            return {
                data: data,
                error: error,
                record: record,
                type: actionTypes.updateError,
            };
        },
        deleteStart: function (record, data) {
            var name = "deleteStart";
            assertOneRecord(name, record);
            return {
                data: data,
                record: record,
                type: actionTypes.deleteStart,
            };
        },
        deleteSuccess: function (record, data) {
            var name = "deleteSuccess";
            assertOneRecord(name, record);
            return {
                data: data,
                record: record,
                type: actionTypes.deleteSuccess,
            };
        },
        deleteError: function (error, record, data) {
            var name = "deleteError";
            assertError(name, error);
            assertOneRecord(name, record);
            return {
                data: data,
                error: error,
                record: record,
                type: actionTypes.deleteError,
            };
        }
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = actionCreatorsFor;
