'use strict';

const { DynamoDB } = require("aws-sdk")
const res = require("../../utils/res")
const dumpList = require("../../models/dumps")

module.exports.list = async (event) => {
    //not complete

    return res(200, {
        dumps: await dumpList()
    });
};