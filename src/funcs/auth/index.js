'use strict';

const { DynamoDB } = require("aws-sdk")
const { res, config, createUID } = require("../utils")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports.index = async (event) => {
    let uid = event.headers?.host
    let AESKey = await config('secret')


    //console.log(AESKey)
    //console.log(createUID())

    return res(200, null);
};