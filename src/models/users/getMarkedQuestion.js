'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid, dumpID) => {
    let result = (await db.get({
        TableName,
        Key: {
            id: '#users#' + uid,
            sid: '#dumps#' + dumpID
        }
    }).promise())?.Item?.value;

    return result ? result : [];
}